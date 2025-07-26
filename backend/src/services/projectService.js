import Project from '../models/Project.js';
import ApiError from '../utils/ApiError.js';

export const createProject = async (projectData, userId) => {
  const project = await Project.create({ ...projectData, createdBy: userId });
  return project;
};

export const getAllProjects = async () => {
  return await Project.find().populate('users', 'name email role');
};
