const express = require("express")
const router = express.Router();

const {
    LoginController,
    RegisterController,
    verifyEmailController,
    forgetPasswordController,
    resetPasswordController
} = require("../controllers/userController")



router.post("/register",RegisterController);
router.post("/login",LoginController);

router.get("/verify/:token", verifyEmailController);

router.post("/forgetpassword", forgetPasswordController);
router.post("/resetpassword/:token", resetPasswordController);


module.exports = router