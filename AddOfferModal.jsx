import React, { useState } from "react";

export default function OfferModal({ isOpen, onClose, onSubmit }) {

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      imageUrl,
    });

    setTitle("");
    setImageUrl("");
  };


  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg w-[350px]">

        <h2 className="text-xl font-bold mb-4">
          Add Offer Banner
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">


          <input
            type="text"
            placeholder="Offer Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />


          <input
            type="text"
            placeholder="Image URL"
            className="w-full border p-2 rounded"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />


          <div className="flex justify-end gap-2 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Add
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
