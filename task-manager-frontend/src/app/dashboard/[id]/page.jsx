'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '../../services/axiosInstance';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project description Page is not Created Yet</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p className="mt-2 text-gray-700">{project.description}</p>
      <p className="text-sm text-gray-500 mt-4">Created At: {new Date(project.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ProjectDetail;
