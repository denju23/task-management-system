import express from 'express';
import { createProject, getProjects } from '../controllers/projectController.js';
import authenticate from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('admin'), createProject);
router.get('/', authenticate, getProjects); // All roles can view

export default router;
