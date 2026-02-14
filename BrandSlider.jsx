import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function BrandSlider({ refresh }) {
  const { user } = useSelector((state) => state.auth);

  const [brands, setBrands] = useState([]);

  // Load Brands
  const getBrands = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/brand/get/${user._id}`
      );

      if (res.data.success) {
        setBrands(res.data.brands);
      }
    } catch {
      toast.error("Failed to load brands ❌");
    }
  };

  useEffect(() => {
    if (user?._id) getBrands();
  }, [user, refresh]);

  // Delete Brand
  const deleteBrand = async (id) => {
    if (!window.confirm("Delete this brand?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:8000/brand/delete/${id}`
      );

      if (res.data.success) {
        toast.success("Brand deleted ✅");
        getBrands();
      }
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  if (!brands.length) return null;

  return (
    <div className="my-8 overflow-x-auto">

      <div className="flex gap-6 pb-2">

        {brands.map((item) => (
          <div
            key={item._id}
            className="relative flex-shrink-0 w-40 h-20 bg-white shadow-md rounded-lg
                       flex items-center justify-center group
                       transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            {/* Delete */}
            <button
              onClick={() => deleteBrand(item._id)}
              className="absolute top-1 right-1 hidden group-hover:block
                         bg-red-500 text-white px-2 rounded text-xs"
            >
              ✕
            </button>

            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}

      </div>
    </div>
  );
}
