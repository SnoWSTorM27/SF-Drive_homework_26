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

// /api/auth/register
// router.post(
//     "/register",
//     [
//         check("email", "Некорректный email").isEmail(),
//         check("password", "Минимальная длина пароля 6 символов")
//             .isLength({min: 6})
//     ],
//     async (req, res) => {
        
//     try {
//         console.log("Body",req.body)
//         const errors = validationResult(req);
        
//         if (!errors.isEmpty()){
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: "Некорректные данные при регистрации"    
//             })    
//         }
        
//         const {email, password, name, birthDay, phone, serialPass, selectedDatePass, provide, idPassOffice, idDrivingLicense, selectedDateDrivingLicence} = req.body;

//         const candidate = await User.findOne({ email });

//         if (candidate) {
//             return res.status(400).json({message: "Такой пользователь уже существует"});
//         }

//         const hashedPassword = await bcrypt.hash(password, 12);
//         const user = new User({ email, password: hashedPassword, name, birthDay, phone, serialPass, selectedDatePass, provide, idPassOffice, idDrivingLicense, selectedDateDrivingLicence});

//         await user.save();
//         res.status(201).json({ message: "Пользователь успешно создан"});

//     } catch (e) {
//         console.log(e)
//         res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
//     }
// });

// // /api/auth/login
// router.post(
//     "/login",
//     [
//         check("email", "Введите корректный email").normalizeEmail().isEmail(),
//         check("password", "Введите пароль").exists()
//     ],
//     async (req, res) => {
//     try {
//         const errors = validationResult(req);
        
//         if (!errors.isEmpty()){
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: "Некорректные данные при входе в систему"    
//             })    
//         }

//         const {email, password} = req.body;
//         const user = await User.findOne({ email });
        
//         if (!user) {
//             return res.status(400).json({message: "Пользователь не найден"})
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({message: "Неверный пароль, попробуйте снова"})
//         }

//         const token = jwt.sign(
//             { userId: user.id },
//             config.get("jwtSecret"),
//             { expiresIn: "1h"}
//         );

//         res.json({ token,userId: user.id });

//     } catch (e) {
//         res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
//     }    

// });

// module.exports = router;