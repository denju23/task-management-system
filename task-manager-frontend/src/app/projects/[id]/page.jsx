'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask, createTask } from '../../features/tasks/tasksSlice';
import { toast } from 'react-toastify';
import TaskBoard from '../../components/TaskBoardPage';
import CreateTaskModal from '../../components/CreateTaskModal'
  
export default function ProjectDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { list: tasks, loading } = useSelector((state) => state.tasks);
    const { user } = useSelector((state) => state.auth); // Assuming you store role here
    const [showModal, setShowModal] = useState(false);
   

    useEffect(() => {
        if (id) dispatch(fetchTasks(id));
    }, [dispatch, id]);

    const groupedTasks = {
        pending: tasks.filter((task) => task.status?.toLowerCase() === 'pending'),
        inProgress: tasks.filter((task) => task.status?.toLowerCase() === 'in progress'),
        completed: tasks.filter((task) => task.status?.toLowerCase() === 'completed'),
    };

    const statusLabels = {
        pending: 'Pending',
        inProgress: 'In Progress',
        completed: 'Completed',
    };

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination || source.droppableId === destination.droppableId) return;
        const newStatus = destination.droppableId;

        try {
            await dispatch(updateTask({ id: draggableId, data: { status: newStatus } })).unwrap();
            dispatch(fetchTasks(id));
            toast.success('Task status updated!');
        } catch {
            toast.error('Failed to update task status');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4 items-center">
                <h1 className="text-2xl font-bold">Project Tasks</h1>
                {(user?.user?.role === 'manager' || user?.user?.role === 'admin') && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Create Task
                    </button>
                )}
            </div>

            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <TaskBoard
                    groupedTasks={groupedTasks}
                    statusLabels={statusLabels}
                    onDragEnd={onDragEnd}
                />
            )}

            {/* Create Task Modal */}
            <CreateTaskModal
                showModal={showModal}
                setShowModal={setShowModal}
                projectId={id}
            />

        </div>
    );
}
