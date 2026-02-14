import React, { useState } from "react";

export default function AddBrandModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  if (!isOpen) return null;

  const submit = (e) => {
    e.preventDefault();

    onSubmit({ title, imageUrl });

    setTitle("");
    setImageUrl("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">Add Brand</h2>

        <form onSubmit={submit} className="space-y-3">

          <input
            placeholder="Brand Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="bg-pink-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>

            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
