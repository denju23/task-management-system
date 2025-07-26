import Task from '../models/Task.js';
import ApiError from '../utils/ApiError.js';

export const createTask = async (data, userId) => {
  return await Task.create({ ...data, createdBy: userId });
};

export const getTasksByProject = async (projectId) => {
  return await Task.find({ project: projectId }).populate('assignedTo', 'name email');
};

export const updateTask = async (taskId, updates, userId, role) => {
  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, 'Task not found');

  if (role !== 'manager' && String(task.assignedTo) !== String(userId)) {
    throw new ApiError(403, 'Not authorized to update this task');
  }

  Object.assign(task, updates);
  await task.save();
  return task;
};

export const deleteTask = async (taskId, role) => {
  if (role !== 'manager') throw new ApiError(403, 'Only manager can delete tasks');
  return await Task.findByIdAndDelete(taskId);
};
