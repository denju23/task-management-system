'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, fetchTasks } from '../features/tasks/tasksSlice';
import { toast } from 'react-toastify';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const CreateTaskModal = ({ showModal, setShowModal, projectId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (user?.role !== 'admin' && user?.role !== 'manager') {
      toast.error('Only admins or managers can create a task.');
      return;
    }

    if (!formData.title || !formData.description || !formData.dueDate || !formData.assignedTo) {
      toast.warning('Please fill all fields.');
      return;
    }

    try {
      setLoading(true);
      const result = await dispatch(createTask({ ...formData, project: projectId })).unwrap();
      toast.success('✅ Task created successfully!');
      dispatch(fetchTasks(projectId)); // refresh tasks
      setFormData({ title: '', description: '', dueDate: '', assignedTo: '' });
      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || Object.values(formData).some((val) => !val.trim());

  if (!showModal) return null;

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Form onSubmit={handleCreateTask}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label><strong>Title</strong></Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Description</strong></Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Due Date</strong></Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Assignee User ID</strong></Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              placeholder="Enter User ID"
              value={formData.assignedTo}
              onChange={handleChange}
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
              'Create Task'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
