import * as taskService from '../services/taskService.js';
import asyncHandler from '../utils/asyncHandler.js';
import Task from '../models/Task.js'

export const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body, req.user._id);
  res.status(201).json({ success: true, task });
});

// export const getProjectTasks = asyncHandler(async (req, res) => {
//   const tasks = await taskService.getTasksByProject(req.params.projectId);
//   res.status(200).json({ success: true, tasks });
// });


export const getProjectTasks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', status } = req.query;
  const projectId = req.params.projectId;

  const result = await taskService.getTasksByProject({
    projectId,
    page: parseInt(page),
    limit: parseInt(limit),
    search,
    status,
  });

  res.status(200).json({ success: true, ...result });
});


export const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(
    req.params.taskId,
    req.body,
    req.user._id,
    req.user.role
  );
  res.status(200).json({ success: true, task });
});

export const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.taskId, req.user.role);
  res.status(200).json({ success: true, message: 'Task deleted' });
});



// export const batchUpdateTasks = asyncHandler(async (req, res) => {
//   const updates = req.body; // expecting [{ id, updates:{ status, priority, assignedTo } }, ...]
//   const bulkOps = updates.map(u => ({
//     updateOne: {
//       filter: { _id: u.id },
//       update: { $set: u.updates }
//     }
//   }));
//   const result = await Task.bulkWrite(bulkOps);
//   res.status(200).json({ success: true, modifiedCount: result.nModified });
// });



export const batchUpdateTasks = asyncHandler(async (req, res) => {
  const updates = req.body; // expecting [{ id, updates: {...} }, ...]

  if (!Array.isArray(updates)) {
    return res.status(400).json({ success: false, message: 'Invalid input format' });
  }

  const bulkOps = updates.map(u => ({
    updateOne: {
      filter: { _id: u.id },
      update: { $set: u.updates }
    }
  }));

  const result = await Task.bulkWrite(bulkOps);

  res.status(200).json({
    success: true,
    modifiedCount: result.modifiedCount ?? result.nModified // nModified for older mongoose
  });
});
