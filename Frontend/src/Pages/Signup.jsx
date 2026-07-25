import React from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../Configs/api";
import toast from "react-hot-toast";
import { EyeIcon, EyeOff } from "lucide-react";
import { getUserData } from "../Context/userContext";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      setIsLoading(true);

      const res = await api.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="bg-[#111729] min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
      >
        <h1 className="text-3xl font-semibold text-center text-white">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-2 mb-8">
          Join AlgoTrack and start tracking your DSA journey.
        </p>

        {/* Username */}

        <div className="mb-4">
          <label className="text-sm text-gray-300 mb-2 block">Username</label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white outline-none focus:border-indigo-500"
          />
        </div>

        {/* Email */}

        <div className="mb-4">
          <label className="text-sm text-gray-300 mb-2 block">Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white outline-none focus:border-indigo-500"
          />
        </div>

        {/* Password */}

        <div className="mb-4">
          <label className="text-sm text-gray-300 mb-2 block">Password</label>

          <div className="relative flex items-center w-full h-12 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full h-12 rounded-xl pl-4 border-white/10  text-white outline-none focus:border-indigo-500"
            />

            <div
              className="absolute right-5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <EyeIcon />}
            </div>
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          <Link to="/login" className="ml-2 text-indigo-400 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
