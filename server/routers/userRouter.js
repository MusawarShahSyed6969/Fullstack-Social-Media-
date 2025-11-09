const express = require("express")
const router = express.Router();

const {
    LoginController,
    RegisterController,
    verifyEmailController,
    forgetPasswordController,
    resetPasswordController,
    getProfile
} = require("../controllers/userController")
const {protect} = require("../middleware/auth")


// PUBLIC
router.post("/register",RegisterController);
router.post("/login",LoginController);

router.get("/verify/:token", verifyEmailController);

router.post("/forgetpassword", forgetPasswordController);
router.post("/resetpassword/:token", resetPasswordController);


// PROTECTED
router.post("/me",protect ,getProfile);


module.exports = router