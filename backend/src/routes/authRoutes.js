// File: routes/authRoutes.js
import express from 'express';
import { register, login, getMe, logout, handleGoogleLogin } from '../controllers/authController.js';
import authenticate from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);   // new
router.get('/me', authenticate, getMe);
router.post('/google-login', handleGoogleLogin);




export default router;
