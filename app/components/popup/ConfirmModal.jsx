// components/ConfirmModal.jsx
import React from "react";

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    // Overlay: Fixed position to cover the entire viewport,
    // semi-transparent black background, centered content, and high z-index.
    // The 'bg-black/70' provides a slightly darker overlay for better contrast.
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50">
      {/* Modal content container */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-sm"> {/* Added max-w-sm for better responsiveness */}
        {/* Title of the confirmation modal */}
        {/* <h2 className="text-lg font-semibold mb-3">{title || "Confirm Action"}</h2> */}

        {/* Message to the user */}
        <p className="text-gray-700 mb-6">{message || "Are you sure you want to proceed?"}</p>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          {/* Cancel button */}
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 cursor-pointer text-gray-800 hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          {/* Confirm button */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md cursor-pointer bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

