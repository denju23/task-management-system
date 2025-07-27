import Project from '../models/Project.js';
import ApiError from '../utils/ApiError.js';

export const createProject = async (projectData, userId) => {
  const project = await Project.create({ ...projectData, createdBy: userId });
  return project;
};

// export const getAllProjects = async () => {
//   return await Project.find().populate('users', 'name email role');
// };


export const getAllProjects = async ({ page = 1, limit = 10, search = '', status }) => {
  const query = {
    ...(status && { status }),
    ...(search && { title: { $regex: search, $options: 'i' } }),
  };

  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find(query)
      .populate('users', 'name email role')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),

    Project.countDocuments(query),
  ]);

  return {
    projects,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    total,
  };
};
