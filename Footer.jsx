import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white transition-all duration-500">

      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Layout */}
        <div className="flex flex-col md:flex-row justify-between gap-10 text-center md:text-left">

          {/* Brand */}
          <div className="md:w-1/3 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold flex justify-center md:justify-start gap-2 items-center">
              🛍️ <span className="hover:text-yellow-300 transition-colors duration-300">E-Shop</span>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-white/90 hover:text-white transition-colors duration-300">
              E-Shop helps admins manage products easily with categories,
              brand showcase, and smart dashboard features.
            </p>
          </div>

          {/* Features */}
          <div className="md:w-1/3 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-3 border-b-2 border-white/50 inline-block pb-1">
              Features
            </h3>

            <ul className="space-y-2 text-sm text-white/90">
              <li className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer">✔ Product Management</li>
              <li className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer">✔ Category System</li>
              <li className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer">✔ Brand Slider</li>
              <li className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer">✔ Smart Search</li>
              <li className="hover:text-yellow-300 transition-colors duration-300 cursor-pointer">✔ Secure Login</li>
            </ul>
          </div>

          {/* About */}
          <div className="md:w-1/3 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-3 border-b-2 border-white/50 inline-block pb-1">
              About
            </h3>

            <p className="text-sm leading-relaxed text-white/90 hover:text-white transition-colors duration-300">
              Built using MERN Stack with React, MongoDB, Node.js,
              and Tailwind CSS.
            </p>

            <p className="mt-3 text-sm hover:text-yellow-300 transition-colors duration-300 cursor-pointer">
              📧 support@eshop.com
            </p>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/30 text-center py-4 text-sm hover:bg-white/10 transition-colors duration-300 cursor-pointer">
        © {new Date().getFullYear()} E-Shop | All Rights Reserved
      </div>

    </footer>
  );
}
