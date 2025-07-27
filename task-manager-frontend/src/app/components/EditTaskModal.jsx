'use client'
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['To Do', 'In Progress', 'Done'];

const EditTaskModal = ({ isOpen, onClose, task, onUpdate }) => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    status: '',
    priority: '',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        status: task.status || 'To Do',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '',
      });
    }
  }, [task]);

  // Restrict editing if not manager or assigned user
  const canEdit =
    user?.user?.role === 'manager' || user?.user?._id === task?.assignee;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canEdit) return;

    // Ensure required fields are filled
    const { status, priority, dueDate } = formData;
    if (!status || !priority || !dueDate) return;

    onUpdate(task._id, {
      status,
      priority,
      dueDate,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />

        <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl z-20">
          <Dialog.Title className="text-lg font-semibold mb-4">Edit Task</Dialog.Title>

          {!canEdit ? (
            <p className="text-red-600">You are not authorized to edit this task.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default EditTaskModal;
