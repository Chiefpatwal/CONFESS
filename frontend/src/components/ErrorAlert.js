import React from 'react';

const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="toast toast-top toast-end z-50">
      <div className="alert alert-error shadow-lg">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          
          <div className="flex-1">
            <h4 className="font-semibold">Error</h4>
            <p className="text-sm opacity-90">
              {message || "Something went wrong. Please try again."}
            </p>
          </div>
          
          <button 
            className="btn btn-ghost btn-sm btn-circle"
            onClick={onClose}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;