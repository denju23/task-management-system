import ActivityLog from '../models/ActivityLog.js';

export const logActivity = async ({ taskId, userId, field, from, to }) => {
  return await ActivityLog.create({ task: taskId, user: userId, field, from, to });
};

export const getActivityLogs = async (taskId) => {
  return await ActivityLog.find({ task: taskId })
    .sort('-createdAt')
    .populate('user', 'name email');
};
