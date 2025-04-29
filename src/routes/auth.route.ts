import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateSignup, validateLogin, validateForgotPass, validateVerifyEmail } from '../validators/user.validators';
const router = express.Router();
const authController = new AuthController();

router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateLogin, authController.login);

router.post("/forgot-password", validateForgotPass, authController.forgotPassword);

router.post("/reset-password", validateLogin, authController.resetPassword);

router.post("/verifiy-email", validateVerifyEmail, authController.verifiyEmail);

router.post("/logout", authController.logout);




export default router;