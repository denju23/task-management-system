// TaskBoard.jsx
'use client'
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import EditTaskModal from '../components/EditTaskModal'






const TaskBoard = ({ groupedTasks, statusLabels, onDragEnd }) => {


    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const statusColors = {
        pending: 'bg-yellow-400',
        inProgress: 'bg-blue-500',
        completed: 'bg-green-500',
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteTask(task._id)).unwrap();
            toast.success("Task deleted successfully");
        } catch (err) {
            toast.error(err || "Failed to delete task");
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {Object.entries(groupedTasks).map(([statusKey, tasks]) => (
                        <Droppable droppableId={statusKey} key={statusKey}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`flex flex-col bg-white border rounded-xl shadow-sm p-4 min-h-[400px] transition ${snapshot.isDraggingOver ? 'bg-gray-100 border-blue-400' : 'bg-white'
                                        }`}
                                >
                                    {/* Column Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-gray-700 capitalize flex items-center gap-2">
                                            <span className={`w-3 h-3 rounded-full ${statusColors[statusKey]}`}></span>
                                            {statusLabels[statusKey]}
                                        </h2>
                                        <span className="text-sm text-gray-500">{tasks.length} task(s)</span>
                                    </div>

                                    {/* Task Cards OR Empty State */}
                                    <div className="space-y-3 flex-1">
                                        {tasks.length === 0 ? (
                                            <div className="text-gray-400 text-center italic py-12 border border-dashed rounded-md">
                                                No tasks in this column.
                                            </div>
                                        ) : (
                                            tasks.map((task, index) => (
                                                <Draggable draggableId={task._id} index={index} key={task._id}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`relative rounded-lg border p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition ${snapshot.isDragging ? 'bg-white shadow-lg' : ''
                                                                }`}
                                                            onClick={() => handleTaskClick(task)}

                                                        >
                                                            <h3 className="font-semibold text-base text-gray-800">{task.title}</h3>
                                                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                                            <div className="mt-2 text-xs text-gray-500 space-y-1">
                                                                <div><strong>Priority:</strong> {task.priority}</div>
                                                                <div><strong>Due:</strong> {task.dueDate?.slice(0, 10)}</div>
                                                            </div>

                                                            {/* Delete Button */}
                                                            <button
                                                                onClick={() => handleDelete(task._id)}
                                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                                                                title="Delete Task"
                                                            >
                                                                ❌
                                                            </button>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        )}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}

                </div>
            </DragDropContext>
            {/* ✅ Place Modal here so it doesn't interfere with layout */}
            {
                showModal && selectedTask && (
                    <EditTaskModal
                        isOpen={showModal} // ✅ explicitly pass a boolean
                        task={selectedTask}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedTask(null);
                        }}
                    />
                )
            }
        </>
    );


};


export default TaskBoard;
