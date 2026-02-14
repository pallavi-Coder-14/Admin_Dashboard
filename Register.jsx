import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleONchange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        value
      );

      // ✅ SUCCESS
      toast.success(response.data.message);
      navigate("/login");

    } catch (error) {
      // ✅ ERROR HANDLING
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server not responding");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create your Account
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              name="userName"
              value={value.userName}
              onChange={handleONchange}
              placeholder="Enter user name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={value.email}
              onChange={handleONchange}
              placeholder="name@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={value.password}
              onChange={handleONchange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have Account?
            <Link to="/login" className="ml-1 text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
