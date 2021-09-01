// const {Router} = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Role = require("../models/Role");
// const router = Router();

const generateTokens = async (id, roles) =>{
    const payload = {
        id, 
        roles
    }
    const accessToken = jwt.sign(payload,config.get("jwtSecretAccess"),{expiresIn:"15s"})
    const refreshToken = jwt.sign({},config.get("jwtSecretRefresh"),{expiresIn:"30d"})
    const query = {_id:id}
    await User.updateOne(query,{refreshToken:refreshToken})
    return {
        accessToken,
        refreshToken
    }
}

class authController {
    async registration(req, res){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка при регистрации", errors});
            }
            const {email, password, name, birthDay, phone, serialPass, selectedDatePass, provide, idPassOffice, idDrivingLicense, selectedDateDrivingLicence} = req.body;
            
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({message: `Пользователь с почтовым адресом ${email} уже существует`});
            }
           
            const hashedPassword = await bcrypt.hash(password, 7);
            const userRole = await Role.findOne({value:"USER"});
            const user = new User({ email, password: hashedPassword, name, birthDay, phone, serialPass, selectedDatePass, provide, idPassOffice, idDrivingLicense, selectedDateDrivingLicence, roles:[userRole.value]});

            await user.save();
            const token = await generateTokens(user._id, user.roles);
             
            return res.status(201).json({ message: "Пользователь успешно зарегистрирован", token} );

        } catch (e) {
            console.log(e)
            res.status(400).json({message:"Ошибка регистрации",error:e})
        }
    }

    async login(req, res){
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message:`Пользователь ${email} не найден`})
            }
            const isValidPassword = bcrypt.compareSync(password, user.password);

            if (!isValidPassword) {
                return res.status(400).json({message: "Неверный пароль, попробуйте снова"})
            }
            const token = await generateTokens(user._id, user.roles);
            return res.json( token );   

        } catch (e) {
            res.status(400).json({message:"Login error"})
        }
    }

    async changePass(req, res){
        try {
            const {email, newPassword} = req.body;
            const user = await User.findOne({email});
            
            if (!user) {
                return res.status(400).json({message:`Пользователь не найден`})
            }
            const isEqualPassword = bcrypt.compareSync(newPassword, user.password);
            
            if (isEqualPassword){
                return res.status(400).json({message:"Пароли совпадают"})
            }
            const query = {_id:user.id}
            const hashedNewPassword = await bcrypt.hash(newPassword, 7);
            await User.updateOne(query,{password:hashedNewPassword})
            
            return res.status(200).json( {message:"Успешная смена пароля"} );   
        } catch (e) {
            res.status(400).json({message:"Login error"})
        }
    }

    async refresh(req, res) {
        try {
            const decodedData = jwt.verify(req.body.refreshToken, config.get("jwtSecretRefresh"));
        } catch (e) {
            return res.status(401).json({message:"Пользователь не авторизован"})
        }
        
        
        const user = await User.findOne(req.body)
        if (!user){
            return res.status(401).json({message:"Не найден пользователь"})
        }
        const token = await generateTokens(user._id, user.roles);
                
        return res.json( token );  
    }


    async getUsers(req, res){
        try {
            const users = await User.find();   
            res.json(users);
        } catch (e) {
            
        }
    }

}

module.exports = new authController()

