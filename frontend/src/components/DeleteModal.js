
import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-black text-white max-w-sm p-6 rounded-lg relative">
        {/* Header */}
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Post
        </h3>

        {/* Body */}
        <p className="text-gray-300 text-sm mb-4">
          Are you sure you want to delete this confession? <br />
          <span className="text-red-400 font-semibold">This action cannot be undone.</span>
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            className="btn btn-sm btn-ghost text-white border-white hover:bg-gray-800"
            onClick={onClose}
            disabled={isLoading}
          >
            No
          </button>

          <button
            className={`btn btn-sm btn-error flex items-center gap-2 ${isLoading ? "loading" : ""}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </>}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop bg-black/80"></div>
    </div>
  );
};

export default DeleteModal;
