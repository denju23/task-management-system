import cron from 'node-cron';
import Task from '../models/Task.js';
import logger from '../utils/logger.js';
import { sendEmail } from '../utils/email.js';

// runs every day at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  logger.info('🔔 Running overdue tasks check');
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
      logger.info(`📧 Sent overdue email to ${assignee.email} for task ${task._id}`);
    }
  }
});

logger.info('✅ Cron jobs initialized');
