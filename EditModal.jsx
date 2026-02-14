import React, { useState } from "react";

export default function EditModal({ isOpen, onClose, onSubmit }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  if (!isOpen) return null;

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      des: description,
      Image_url: imageUrl,
    };

    onSubmit(productData);

    // Reset
    setTitle("");
    setDescription("");
    setImageUrl("");

    onClose();
  };

  return (
    <div id="editmodal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Image URL
            </label>

            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg"
            >
              Close
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              Update
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
