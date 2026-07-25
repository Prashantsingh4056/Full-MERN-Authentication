import { CheckCircle, Loader2, RotateCcw } from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
import api from "../Configs/api";
import { Link, useNavigate, useParams } from "react-router-dom";

function VerifyOTP() {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setIsLoading(true);

      const res = await api.post(`/api/auth/verify-otp/${email}`, {
        otp: finalOtp,
      });

      setSuccessMessage(res.data.message);

      setTimeout(() => {
        navigate(`/change-password/${email}`);
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const clearOtp = () => {
    console.log("clicked");

    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const handleResendOtp = async () => {
    try {
      await api.post("/api/auth/forgot-password", { email });

      clearOtp();

      setCanResend(false);
      setTimer(30);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-[#111729] min-h-screen flex items-center justify-center px-4">
      {/* Main Content */}

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-center text-white">
            Verify OTP
          </h1>
          <p className="text-gray-400 text-center mt-2">
            Enter the 6-digit verification code sent to
          </p>

          <p className="text-indigo-400 text-center mt-1 font-medium">
            {email}
          </p>
        </div>
        {/* Card */}
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
          <div>
            <p className="text-center">
              {isVerified
                ? "Code verified successfully! Redirecting..."
                : "Enter the 6-digit code sent to your Email"}
            </p>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">
                {error}
              </div>
            )}
            {successMessage && (
              <p className="text-green-400 text-center text-sm mb-3 mt-3 rounded-xl px-4 py-3 border border-green-500 bg-green-500/50">
                {successMessage}
              </p>
            )}
            {isVerified ? (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto">
                  <CheckCircle className="text-green-400" size={34} />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-lg">
                    Verification Successful
                  </h3>
                  <p className="text-gray-400">
                    Your email has been verified. you'll be redirected to reset
                    your password
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-400">Redirecting...</span>
                </div>
              </div>
            ) : (
              <div>
                {/* OTP Input */}
                <div className="flex justify-center gap-3 mt-8 mb-8">
                  {otp.map((digit, index) => {
                    return (
                      <input
                        onChange={(e) => handleChange(index, e.target.value)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        key={index}
                        maxLength={1}
                        value={digit}
                        className="w-12 h-14 rounded-xl bg-white/5 border border-white/10 text-center text-xl font-semibold text-white outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    );
                  })}
                </div>

                {/* Actions Buttons */}
                <div className="space-y-3 flex flex-col justify-center ">
                  <button
                    onClick={handleVerify}
                    className=" w-full h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium disabled:opacity-60"
                    disabled={isLoading || otp.some((digit) => digit === "")}
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying
                      </div>
                    ) : (
                      "Verify Code"
                    )}
                  </button>

                  <button
                    onClick={clearOtp}
                    disabled={isLoading || isVerified}
                    className=" w-full h-12 rounded-full border border-white/10 bg-white/5 text-gray-300 font-medium flex items-center justify-center gap-2
                        transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:text-white active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw size={18} />
                    Clear
                  </button>

                  {/* ADD THIS HERE 👇 */}
                  <div className="text-center mt-2">
                    <p className="text-sm text-gray-400">
                      Didn't receive the code?
                    </p>

                    {canResend ? (
                      <button
                        onClick={handleResendOtp}
                        className="mt-2 text-indigo-400 hover:underline"
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <p className="mt-2 text-sm text-gray-500">
                        Resend in {timer}s
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-5 mb-5">
            <p className="text-sm text-gray-400">
              Wrong email?{" "}
              <Link
                to={"/forgot-password"}
                className="text-indigo-400 hover:underline font-medium"
              >
                Go Back
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
