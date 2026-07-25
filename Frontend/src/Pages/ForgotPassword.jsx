import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Configs/api";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setHasError(false);

      const res = await api.post("/api/auth/forgot-password", {
        email,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/verify-otp/${email}`);
      }
    } catch (error) {
      setHasError(true);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#111729]">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8">

        {!hasError ? (
          <>
            <h1 className="text-3xl font-semibold text-white text-center">
              Forgot Password
            </h1>

            <p className="text-gray-400 text-center mt-2">
              Enter your email address and we'll send you an OTP to reset your
              password.
            </p>

            <form
              onSubmit={handleForgotPassword}
              className="mt-8 space-y-5"
            >
              <div className="relative flex items-center h-12 rounded-full bg-white/5 border border-white/10 focus-within:border-indigo-500">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-400 absolute left-3"
                  viewBox="0 0 24 24"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-10 w-full h-full rounded-full bg-transparent outline-none text-white placeholder:text-gray-500 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                disabled={isLoading}
                className="w-full h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium disabled:opacity-70"
              >
                {isLoading ? "Sending..." : "Send Reset OTP"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Remember your password?
              <Link
                to="/login"
                className="text-indigo-400 ml-1 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </>
        ) : (
          <div className="text-center py-8">

            <div className="w-18 h-18 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-6">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-red-400"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <circle cx="12" cy="16" r="1" />
              </svg>

            </div>

            <h2 className="text-2xl font-semibold text-white">
              Something went wrong
            </h2>

            <p className="text-gray-400 mt-3">
              We couldn't send the reset OTP.
              <br />
              Please try again.
            </p>

            <button
              onClick={() => setHasError(false)}
              className="mt-8 px-8 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 transition text-white"
            >
              Try Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;