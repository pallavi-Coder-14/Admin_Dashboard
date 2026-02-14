import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/Slices/AuthSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        value
      );

      if (response.data.success) {

        // ✅ Save in Redux
        dispatch(setAuth(response.data.user));

        // ✅ Save in localStorage (IMPORTANT)
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        toast.success("Login successful");

        // ✅ Redirect
        navigate("/");

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign in to your account
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={value.email}
              onChange={handleOnChange}
              placeholder="name@example.com"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={value.password}
              onChange={handleOnChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?
            <Link
              to="/register"
              className="ml-1 text-blue-600 font-medium"
            >
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </section>
  );
}
