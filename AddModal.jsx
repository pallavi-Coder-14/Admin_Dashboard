import React, { useState } from "react";

export default function AddModal({ isOpen, onClose, onSubmit }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(""); // ✅ NEW

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      des: description,
      Image_url: imageUrl,
      category,
      price, // ✅ SEND PRICE
    };

    onSubmit(productData);

    // Reset form
    setTitle("");
    setDescription("");
    setImageUrl("");
    setCategory("");
    setPrice("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-5 text-center">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Image */}
          <input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="">Select Category</option>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
            <option>Electronics</option>
            <option>Accessories</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-pink-500 px-4 py-2 text-white rounded"
            >
              Close
            </button>

            <button
              type="submit"
              className="bg-purple-600 px-4 py-2 text-white rounded"
            >
              Upload
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
