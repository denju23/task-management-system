import express from 'express';
import {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
  batchUpdateTasks
} from '../controllers/taskController.js';

import authenticate from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// 👨‍💼 Manager creates task
router.post('/', authenticate, authorizeRoles('manager'), createTask);

// 🧑‍💼 All users view tasks for project
router.get('/:projectId', authenticate, getProjectTasks);

// 👨‍💼 Manager or Assigned Member updates task
router.put('/:taskId', authenticate, updateTask);

// ❌ Only Manager can delete task
router.delete('/:taskId', authenticate, authorizeRoles('manager'), deleteTask);

router.patch(
  '/batch',
  authenticate,
  authorizeRoles('manager'),
  batchUpdateTasks
);

export default router;
