import React, { useState, useRef, useEffect } from 'react';

const AddTask = ({ selectedDate, onClose, onAddTask }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    });

    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            ...taskData,
            date: selectedDate,
            id: Date.now()
        };
        onAddTask(newTask);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Updated transparent backdrop with glass effect */}
            <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-b from-white/5 to-black/5"
                 style={{
                     background: 'rgba(255, 255, 255, 0.05)',
                     backdropFilter: 'blur(2px)',
                 }}>
            </div>
            
            {/* Modal content with enhanced glass effect */}
            <div 
                ref={modalRef} 
                className="relative bg-white/70 backdrop-blur-lg rounded-lg p-8 w-full max-w-md 
                         shadow-xl border border-white/30
                         transform transition-all duration-300 ease-in-out"
                style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                    backdropFilter: 'blur(10px)',
                    animation: 'modalFadeIn 0.3s forwards'
                }}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700
                             transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            readOnly
                            className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-sm
                                     border-gray-200 focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={taskData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-sm
                                     border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={taskData.description}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-sm
                                     border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 h-32"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Start Time:</label>
                        <input
                            type="time"
                            name="startTime"
                            value={taskData.startTime}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-sm
                                     border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">End Time:</label>
                        <input
                            type="time"
                            name="endTime"
                            value={taskData.endTime}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-sm
                                     border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300/50 text-gray-700 rounded-md
                                     hover:bg-gray-400/50 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-blue-500/90 text-white rounded-md
                                     hover:bg-blue-600/90 transition-colors duration-200"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                @keyframes modalFadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default AddTask;