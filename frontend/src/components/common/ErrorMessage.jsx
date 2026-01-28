import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg flex items-center gap-3 my-4">
      <FiAlertCircle className="text-xl" />
      <div className="flex-1">{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-100 hover:text-red-50 font-bold"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
