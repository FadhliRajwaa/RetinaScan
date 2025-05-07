import express from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/authController.js';
import { validateRegister, validateLogin, validateForgotPassword, validateResetPassword } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/reset-password', validateResetPassword, resetPassword);

export default router;