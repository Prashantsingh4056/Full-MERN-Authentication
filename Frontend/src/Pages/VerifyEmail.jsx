import React from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

function VerifyEmail() {
    return (
        <div className="bg-[#111729] min-h-screen flex items-center justify-center px-4">
            <div
                className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center"
            >
                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10">
                    <Mail className="h-8 w-8 text-indigo-400" />
                </div>

                {/* Heading */}
                <h1 className="mt-6 text-3xl font-semibold text-white">
                    Check Your Email
                </h1>

                {/* Description */}
                <p className="mt-3 text-gray-400 leading-relaxed">
                    We've sent a verification link to your email address.
                    Please open your inbox and click the verification link to
                    activate your account.
                </p>

                {/* Info Box */}
                <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4">
                    <p className="text-sm text-indigo-300">
                        Once your email is verified, you'll be able to sign in
                        to your AlgoTrack account.
                    </p>
                </div>

                {/* Login Button */}
                <Link
                    to="/login"
                    className="mt-8 flex h-11 w-full items-center justify-center rounded-full bg-indigo-600 text-white font-medium transition hover:bg-indigo-500"
                >
                    Back to Login
                </Link>

                {/* Footer */}
                {/* <p className="mt-6 text-sm text-gray-500">
                    Didn't receive the email?{" "}
                    <button className="text-indigo-400 hover:underline">
                        Resend Verification Email
                    </button>
                </p> */}
            </div>
        </div>
    );
}

export default VerifyEmail;