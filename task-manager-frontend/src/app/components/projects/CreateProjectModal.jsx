'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import axiosInstance from '../../services/axiosInstance';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { createProject, fetchProjects } from '../../features/projects/projectsSlice';
import { useRouter } from 'next/navigation';

const CreateProjectModal = ({ showModal, setShowModal, onProjectCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // ✅ Required

  // Using Redux
  // const handleCreateProject = async (e) => {
  //   console.log('click', name, description)
  //   e.preventDefault(); // ✅ Prevent default reload
  //   if (user?.role !== 'admin') {
  //     toast.error('Only admin can create a project.');
  //     return;
  //   }

  //   if (!name.trim() || !description.trim()) {
  //     toast.warning('Please enter name and description.');
  //     return;
  //   }

  //   try {
  //     // setLoading(true);
  //     console.log("📌 Type of createProject:", createProject);
  //     console.log("📌 Type of dispatch:", dispatch);
  //     // const actionResult = await dispatch(createProject(name, description));

  //     const actionResult = await dispatch(createProject({
  //       name: 'Test Project',
  //       description: 'This is a test project'
  //     }));

  //     console.log("🚀 ~ actionResult:", actionResult);

  //     // If you expect a resolved value only
  //     const result = await actionResult.unwrap();
  //     console.log("✅ Unwrapped Result:", result);


  //     toast.success('✅ Project created successfully!');
  //     // setShowModal(false);
  //     setName('');
  //     setDescription('');
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('❌ Failed to create project');
  //   } finally {
  //     // setLoading(false);
  //   }

  // };



  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (user?.role !== 'admin') {
      toast.error('Only admin can create a project.');
      return;
    }

    if (!name.trim() || !description.trim()) {
      toast.warning('Please enter name and description.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // get token from local storage

      const response = await axios.post(
        'http://localhost:5000/api/v1/projects', // ✅ correct API URL
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ attach token in Authorization header
            'Content-Type': 'application/json', // optional, but good practice
          },
          withCredentials: true, // only if cookies are used on backend
        }
      );

     
      toast.success('✅ Project created successfully!');
      // setShowModal(false);
      setName('');
      setDescription('');
      onProjectCreated?.(); // Optional callback to reload project list
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || !name.trim() || !description.trim();
  if (!showModal) return null;

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Form onSubmit={handleCreateProject}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label><strong>Project Title</strong></Form.Label>
            <Form.Control
              id="projectTitle"
              name="projectTitle"
              type="text"
              placeholder="Enter title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Project Description</strong></Form.Label>
            <Form.Control
              id="projectDescription"
              name="projectDescription"
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitDisabled}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Creating...
              </>
            ) : (
              'Create Project'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>


  );
};

export default CreateProjectModal;
