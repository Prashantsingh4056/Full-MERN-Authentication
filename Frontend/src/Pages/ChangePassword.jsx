// import React, { useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import api from '../Configs/api';

// function ChangePassword() {

//     const {email} = useParams();
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("")
//     const [isLoading, setIsLoading] = useState(false);

//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const navigate = useNavigate()

//     const handleChangePassword = async () => {
//         setError("")
//         setSuccess("")

//         if(!newPassword || !confirmPassword){
//             setError("Please fill in all fields")
//             return
//         }

//         if(newPassword !== confirmPassword){
//             setError("Passwords do not match");
//             return
//         }

//         try {

//             setIsLoading(true)
//             const res = await api.post(`/api/auth/change-password/${email}`, {newPassword, confirmPassword})

//             setSuccess(res.data.message)

//             setTimeout(() => {
//                 navigate('/login')
//             }, 2000)
            
//         } catch (error) {
//             setError(error.response?.data?.message || "something went wrong")
//         } finally {
//             setIsLoading(false)
//         }
//     }

//   return (
//     <div></div>
//   )
// }

// export default ChangePassword


import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../Configs/api";
import toast from "react-hot-toast";

function ChangePassword() {
    const { email } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);
            setHasError(false);

            const res = await api.post(
                `/api/auth/change-password/${email}`,
                {
                    newPassword,
                    confirmPassword,
                }
            );

            if (res.data.success) {
                setSuccess(true);
                toast.success(res.data.message);

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
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
        <div className="bg-[#111729] min-h-screen flex items-center justify-center px-4">

            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8">

                {/* Success */}

                {success ? (
                    <div className="text-center py-8">

                        <div className="w-18 h-18 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="42"
                                height="42"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-green-400"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20 6 9 17l-5-5" />
                            </svg>

                        </div>

                        <h2 className="text-2xl font-semibold text-white">
                            Password Changed
                        </h2>

                        <p className="text-gray-400 mt-3">
                            Your password has been updated successfully.
                            <br />
                            Redirecting to login...
                        </p>

                    </div>
                ) : hasError ? (

                    /* Error */

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
                            We couldn't update your password.
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

                ) : (

                    <>
                        <h1 className="text-3xl font-semibold text-center text-white">
                            Change Password
                        </h1>

                        <p className="text-gray-400 text-center mt-2">
                            Enter your new password below.
                        </p>

                        <form
                            onSubmit={handleChangePassword}
                            className="mt-8 space-y-5"
                        >

                            {/* New Password */}

                            <div className="flex items-center h-12 rounded-full bg-white/5 border border-white/10 focus-within:border-indigo-500 px-5">

                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
                                />

                            </div>

                            {/* Confirm Password */}

                            <div className="flex items-center h-12 rounded-full bg-white/5 border border-white/10 focus-within:border-indigo-500 px-5">

                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
                                />

                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium disabled:opacity-70"
                            >
                                {isLoading
                                    ? "Updating..."
                                    : "Change Password"}
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

                )}

            </div>

        </div>
    );
}

export default ChangePassword;