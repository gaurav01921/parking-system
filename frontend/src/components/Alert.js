import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const Alert = ({ type, message, onClose }) => {
    if (!message) return null;

    const bgColor = {
        success: 'bg-green-100 border-green-500',
        error: 'bg-red-100 border-red-500',
        info: 'bg-blue-100 border-blue-500',
    }[type] || 'bg-gray-100 border-gray-500';

    const textColor = {
        success: 'text-green-800',
        error: 'text-red-800',
        info: 'text-blue-800',
    }[type] || 'text-gray-800';

    const icon = {
        success: <FaCheckCircle />,
        error: <FaTimesCircle />,
        info: <FaInfoCircle />,
    }[type];

    return (
        <div
            className={`fixed top-4 right-4 border-2 ${bgColor} ${textColor} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn`}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-semibold">{message}</span>
            <button
                onClick={onClose}
                className="ml-4 text-lg hover:opacity-70 transition-opacity"
            >
                ×
            </button>
        </div>
    );
};

export default Alert;
