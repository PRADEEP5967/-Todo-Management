import express from 'express';
import { signup, signin, forgotPassword, resetPassword } from '../controllers/userController';
import { validateSignup, validateSignin } from '../middleware/validation';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/signin', validateSignin, signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;