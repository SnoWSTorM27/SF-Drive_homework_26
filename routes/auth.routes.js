const {Router} = require("express");
const router = new Router();
const controller = require("./authController");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// /api/auth/registration
router.post("/registration", [
    check("email","Почта не может быть пустой").notEmpty(),
    check("password", "Пароль должен быть больше 4 символов").isLength({min:4})
] ,controller.registration)


// /api/auth/login
router.post("/login", controller.login)

// /api/auth/users
router.get("/users", [authMiddleware,roleMiddleware(["ADMIN"])], controller.getUsers)
   

module.exports = router;