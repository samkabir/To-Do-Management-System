import React, { useState, useRef, useEffect } from 'react'
import { useDrag } from 'react-dnd';
import { GetIcon } from '../../../icons'
import formatDate from '../../../utils/DateConverter/DateConverter'
import REModal from '../Modals/REModal/REModal'
import DeleteModal from '../Modals/DeleteModal/DeleteModal'

const TaskCard = ({ task, clickOnDelete, onStatusChange, onTaskUpdate }) => {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const contextMenuRef = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id, status: task.status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const handleRightClick = (e) => {
        e.preventDefault();
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
    };

    const handleLeftClick = (e) => {
        e.preventDefault();
        if (!isDragging) {
            setModalOpen(true);
        }
    };

    const handleStatusChange = (newStatus) => {
        if (onStatusChange) {
            onStatusChange(task.id, newStatus);
        }
        setShowContextMenu(false);
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDeleteModalOpen(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                setShowContextMenu(false);
            }
        };

        if (showContextMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showContextMenu]);

    const getStatusOptions = () => {
        switch (task.status.toLowerCase()) {
            case 'new':
                return [
                    { label: 'Move to Ongoing', value: 'ongoing', icon: 'OnGoingIcon' },
                    { label: 'Move to Done', value: 'done', icon: 'DoneIcon' }
                ];
            case 'ongoing':
                return [
                    { label: 'Move to New', value: 'new', icon: 'NewIcon' },
                    { label: 'Move to Done', value: 'done', icon: 'DoneIcon' }
                ];
            case 'done':
                return [
                    { label: 'Move to New', value: 'new', icon: 'NewIcon' },
                    { label: 'Move to Ongoing', value: 'ongoing', icon: 'OnGoingIcon' }
                ];
            default:
                return [];
        }
    };

    return (
        <div>
            <div
                ref={drag}
                className={`${(new Date() > new Date(task.dueDate)) && task.status !== "done" ? 'bg-red-200' : 'bg-white'} 
                    shadow-md rounded-lg p-4 mb-4 cursor-pointer select-none transition-all duration-200
                    ${isDragging ? 'opacity-50 transform rotate-2 scale-105' : 'hover:shadow-lg'}
                    ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onContextMenu={handleRightClick}
                onClick={handleLeftClick}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                }}
            >
                {isDragging && (
                    <div className="absolute inset-0 bg-blue-100 border-2 border-blue-300 border-dashed rounded-lg flex items-center justify-center">
                        <p className="text-blue-600 font-semibold">Moving task...</p>
                    </div>
                )}
                
                {new Date() > new Date(task.dueDate) && task.status !== "done" && (
                    <div className='flex items-center justify-center'>
                        <div className='flex items-center gap-2 border-2 border-red-500 rounded-lg px-2 py-1'>
                            <p className="text-red-500 font-semibold text-sm">Overdue</p>
                            <GetIcon name="OverDueIcon" className='w-4 h-4 text-red-500' />
                        </div>
                    </div>
                )}
                <div className='flex items-center justify-between border-b-2 mb-2'>
                    <div className=''>
                        <h2 className="text-lg font-semibold mb-2">{task.title}</h2>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <GetIcon
                            name="TrashIcon"
                            className='w-6 h-6 cursor-pointer text-red-300 hover:text-red-800'
                            onClick={(e) => { handleDeleteClick(e) }}
                        />
                    </div>
                </div>
                <div className='py-3 border-b-2 mb-3'>
                    <p className="text-gray-700 "> {task.description.length > 100
                        ? `${task.description.substring(0, 97)}...`
                        : task.description}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <GetIcon name="CreateIcon" className='w-5 h-5 text-blue-500' />
                        <p className="text-gray-800 text-sm"> Created At: <span className='font-semibold'>{formatDate(task.createdAt)}</span></p>
                    </div>
                    <div className='flex gap-2'>
                        <GetIcon name="CalendarIcon" className='w-5 h-5 text-red-500' />
                        <p className="text-gray-800 text-sm">Due Date: <span className='font-semibold'>{formatDate(task.dueDate)}</span></p>
                    </div>
                </div>
            </div>

            {/* Context Menu */}
            {showContextMenu && (
                <div
                    ref={contextMenuRef}
                    className="fixed bg-white border border-gray-300 rounded-lg shadow-lg py-2 z-50 min-w-[180px]"
                    style={{
                        left: `${contextMenuPosition.x}px`,
                        top: `${contextMenuPosition.y}px`,
                    }}
                >
                    {getStatusOptions().map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                            onClick={() => handleStatusChange(option.value)}
                        >
                            <GetIcon name={option.icon} className="w-4 h-4" />
                            <span className="text-sm font-medium">{option.label}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Task Details Modal */}
            <REModal
                modalOpen={modalOpen}
                handleClose={() => setModalOpen(false)}
                task={task}
                setModalOpen={setModalOpen}
                clickOnDelete={clickOnDelete}
                onTaskUpdate={onTaskUpdate}
            />

            {/* Task Delete Modal */}
            <DeleteModal
                modalOpen={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                task={task}
                setModalOpen={setDeleteModalOpen}
                clickOnDelete={clickOnDelete}
            />
        </div>
    );
}

export default TaskCard;