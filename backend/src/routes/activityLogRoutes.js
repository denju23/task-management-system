import express from 'express';
import { getLogs } from '../controllers/activityLogController.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/:taskId', authenticate, getLogs);
export default router;
