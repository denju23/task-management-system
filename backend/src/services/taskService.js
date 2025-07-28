import Task from '../models/Task.js';
import ApiError from '../utils/ApiError.js';

export const createTask = async (data, userId) => {
  const { dueDate } = data;

  // Strip time from current date and due date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // make today 00:00:00

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0); // make dueDate 00:00:00

  if (due < today) {
    throw new ApiError(400, 'Due date cannot be in the past');
  }
  return await Task.create({ ...data, createdBy: userId });
};

// export const getTasksByProject = async (projectId) => {
//   return await Task.find({ project: projectId }).populate('assignedTo', 'name email');
// };


export const getTasksByProject = async ({ projectId, page, limit, search, status }) => {
  const query = {
    project: projectId,
    ...(status ? { status } : {}),
    ...(search ? { title: { $regex: search, $options: 'i' } } : {}),
  };

  const total = await Task.countDocuments(query);

  const tasks = await Task.find(query)
    .populate('assignedTo', 'name email')
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    tasks,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
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
