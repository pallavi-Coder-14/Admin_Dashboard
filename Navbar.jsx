import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/Slices/AuthSlice";

export default function Navbar({
  onAddClick,
  onBrandClick,
  onOfferClick,
  search,
  setSearch,
  onMenuClick, // ✅ NEW
}) {

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      className="
      bg-white/80 backdrop-blur shadow-md px-6 py-4
      flex items-center justify-between
      sticky top-0 z-50
    "
    >

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">

        {/* ☰ SIDEBAR BUTTON */}
        <button
          onClick={onMenuClick}
          className="
            text-2xl text-purple-600
            hover:text-purple-800
            transition
          "
        >
          ☰
        </button>

        {/* LOGO */}
        <div className="flex items-center gap-3">

          <div
            className="w-10 h-10 rounded-full bg-gradient-to-r
            from-purple-600 to-pink-500 p-[2px]"
          >
            <div
              className="w-full h-full rounded-full bg-white
              flex items-center justify-center"
            >
              <span className="text-lg">🛍️</span>
            </div>
          </div>

          <h1
            className="
            text-2xl font-bold
            bg-gradient-to-r from-purple-600 to-pink-500
            bg-clip-text text-transparent
            hover:scale-110 transition cursor-pointer
          "
          >
            E-Shop
          </h1>

        </div>

      </div>

      {/* SEARCH */}
      <div className="flex-1 mx-6">

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full max-w-md px-4 py-2 rounded-lg
            border focus:ring-2 focus:ring-purple-500
          "
        />

      </div>

      {/* PROFILE */}
      <div className="flex items-center gap-3">

        <span className="font-bold text-purple-600">
          Admin
        </span>

        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="
              w-11 h-11 rounded-full overflow-hidden
              border-2 border-purple-400
            "
          >
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User"
              className="w-full h-full object-cover"
            />
          </button>

          {/* DROPDOWN */}
          {open && (

            <div
              className="
              absolute right-0 mt-3 w-52
              bg-white rounded-xl shadow-xl
              overflow-hidden
            "
            >

              <button
                onClick={() => {
                  onAddClick();
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-purple-50"
              >
                ➕ Add Product
              </button>

              <button
                onClick={() => {
                  onBrandClick();
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-purple-50"
              >
                🏷️ Add Brand
              </button>

              <button
                onClick={() => {
                  onOfferClick();
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-purple-50"
              >
                🎯 Add Offer
              </button>

              <hr />

              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left
                text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}
