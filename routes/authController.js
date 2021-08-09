// const {Router} = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Role = require("../models/Role");
// const router = Router();

const generateAccessToken = (id, roles) =>{
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"20min"})
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
            return res.status(201).json({ message: "Пользователь успешно зарегистрирован"});

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
            const token = generateAccessToken(user._id, user.roles);
                
            return res.json({ token });   

        } catch (e) {
            res.status(400).json({message:"Login error"})
        }
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

