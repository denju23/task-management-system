import express from 'express';
import {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
  batchUpdateTasks,
  getOverdueTasks
  
} from '../controllers/taskController.js';


import authenticate from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';
import asyncHandler from '../utils/asyncHandler.js';
import Task from '../models/Task.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

// 👨‍💼 Manager creates task
router.post('/', authenticate, authorizeRoles('admin','manager'), createTask);

// 🧑‍💼 All users view tasks for project
router.get('/:projectId', authenticate, getProjectTasks);

// 👨‍💼 Manager or Assigned Member updates task
router.put('/:taskId', authenticate, updateTask);

// ❌ Only Manager can delete task
router.delete('/:taskId', authenticate, authorizeRoles('manager'), deleteTask);

router.patch(
  '/batch',
  authenticate,
  authorizeRoles('manager','admin'),
  batchUpdateTasks
);

router.get('/overdue', authenticate, authorizeRoles(), getOverdueTasks);


// dev route - trigger overdue emails manually
router.get('/trigger-overdue-email', authenticate, authorizeRoles('admin'), asyncHandler(async (req, res) => {
  const now = new Date();

  const overdue = await Task.find({
    dueDate: { $lt: now },
    status: { $ne: 'completed' }
  }).populate('assignedTo', 'email name');

  for (const task of overdue) {
    const assignee = task.assignedTo;
    if (assignee?.email) {
      await sendEmail({
        to: assignee.email,
        subject: `🚨 Overdue Task: ${task.title}`,
        template: 'overdue-task',
        context: {
          name: assignee.name,
          title: task.title,
          dueDate: task.dueDate.toDateString(),
          status: task.status,
        },
      });
    }
  }

  res.status(200).json({ message: 'Overdue emails triggered manually' });
}));



export default router;
