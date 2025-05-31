import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ children, status, onDrop, className }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => {
            if (item.status !== status) {
                onDrop(item.id, status);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const getDropZoneStyles = () => {
        let styles = className || '';

        if (isOver && canDrop) {
            if (status === 'new') {
                styles += ' ring-4 ring-blue-300 bg-blue-50';
            } else if (status === 'ongoing') {
                styles += ' ring-4 ring-orange-300 bg-orange-50';
            } else if (status === 'done') {
                styles += ' ring-4 ring-green-300 bg-green-50';
            }
        } else if (canDrop) {
            styles += ' ring-2 ring-gray-300 ring-dashed';
        }

        return styles;
    };

    return (
        <div
            ref={drop}
            className={`transition-all duration-200 ${getDropZoneStyles()}`}
        >
            {children}
            {isOver && canDrop && (
                <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center pointer-events-none rounded">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-lg border-2 border-dashed border-gray-400">
                        <p className="text-gray-700 font-semibold">Drop task here</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropZone;