import * as projectService from '../services/projectService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body, req.user._id);
  res.status(201).json({ success: true, project });
});

export const getProjects = asyncHandler(async (req, res) => {
  const { page, limit, search, status } = req.query;

  const result = await projectService.getAllProjects({ page, limit, search, status });

  res.status(200).json({ success: true, ...result });
});
