// File: routes/authRoutes.js
import express from 'express';
import { register, login, getMe, logout } from '../controllers/authController.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);   // new
router.get('/me', authenticate, getMe);


export default router;
