import React from "react";

export default function DeleteModal({ isOpen, onClose, onConfirm }) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

      <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-6">

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          Confirm Delete
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to delete this product?
          <br />
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          {/* Cancel */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600"
          >
            Cancel
          </button>

          {/* Delete */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}
