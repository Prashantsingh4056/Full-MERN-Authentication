// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
// import axios from 'axios';
// import api from '../Configs/api';

// function Verify() {

//     const {token} = useParams();

//     const [status, setStatus] = useState("verifying...")
//     const navigate = useNavigate();

//     const verifyEmail = async() => {

//         console.log(token);
        
//         try {

//             const res = await api.post("/api/auth/verify-email", {token})
             
//             console.log(res);
            
//              if(res.data.success){
//                 setStatus("✅ Email Verified Successfully");
//                 setTimeout(() => {
//                     navigate('/login')
//                 }, 2000)
//              }else {
//                 setStatus("❌ Invalid or Expired Token")
//              }
//         } catch (error) {
//             console.log(error);
//             setStatus("❌ Verification Failed. Please try again")
//         }
//     }
//     useEffect(() => {
//         verifyEmail();
//     } , [token, navigate])

//   return (
//     <div className='relative w-full h-[760px] bg-indigo-100 overflow-hidden'>
//         <div className='min-h-screen flex items-center justify-center '>
//             <div className='bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md'>
//                 <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Verify


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import api from "../Configs/api";

function Verify() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await api.post("/api/auth/verify-email", {
                    token,
                });

                if (res.data.success) {
                    setStatus("success");

                    setTimeout(() => {
                        navigate("/login");
                    }, 2500);
                } else {
                    setStatus("failed");
                }
            } catch (error) {
                console.log(error);
                setStatus("failed");
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="bg-[#111729] min-h-screen flex items-center justify-center px-4">
            <div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8"
            >
                {/* Loading */}
                {status === "loading" && (
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10">
                            <Loader2
                                className="h-8 w-8 animate-spin text-indigo-400"
                            />
                        </div>

                        <h1 className="mt-6 text-3xl font-semibold text-white">
                            Verifying Email
                        </h1>

                        <p className="mt-3 text-gray-400">
                            Please wait while we verify your email address.
                        </p>
                    </div>
                )}

                {/* Success */}
                {status === "success" && (
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                            <CheckCircle
                                className="h-9 w-9 text-green-400"
                            />
                        </div>

                        <h1 className="mt-6 text-3xl font-semibold text-white">
                            Email Verified
                        </h1>

                        <p className="mt-3 text-gray-400">
                            Your account has been verified successfully.
                        </p>

                        <p className="mt-4 text-sm text-indigo-400">
                            Redirecting to Login...
                        </p>
                    </div>
                )}

                {/* Failed */}
                {status === "failed" && (
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                            <XCircle
                                className="h-9 w-9 text-red-400"
                            />
                        </div>

                        <h1 className="mt-6 text-3xl font-semibold text-white">
                            Verification Failed
                        </h1>

                        <p className="mt-3 text-gray-400">
                            This verification link is invalid or has expired.
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-8 h-11 w-full rounded-full bg-indigo-600 text-white font-medium transition hover:bg-indigo-500"
                        >
                            Back to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Verify;