import React from "react";

export default function Card({ items, handleEdit, handleDelete }) {
  return (
    <div
      className="
        bg-white rounded-2xl shadow-md overflow-hidden
        transform transition-all duration-300
        hover:scale-105 hover:shadow-2xl
        group
      "
    >
      {/* Image */}
      <div className="overflow-hidden relative">
        <img
          src={items.Image_url}
          alt={items.title}
          className="
            w-full h-52 object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0 bg-black/20 opacity-0
            group-hover:opacity-100 transition
          "
        ></div>
      </div>

      {/* Body */}
      <div className="p-5">

        <h3 className="text-lg font-bold text-gray-800 mb-1">
          {items.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {items.des}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          {/* Edit */}
          <button
            onClick={handleEdit}
            className="
              px-4 py-1.5 rounded-lg text-sm
              bg-blue-500 text-white
              hover:bg-blue-600
              transition shadow
            "
          >
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="
              px-4 py-1.5 rounded-lg text-sm
              bg-red-500 text-white
              hover:bg-red-600
              transition shadow
            "
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}
