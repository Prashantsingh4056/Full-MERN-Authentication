import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EyeIcon, EyeOff } from 'lucide-react';
import api from '../Configs/api';
import { getUserData } from '../Context/userContext';
import toast from 'react-hot-toast';


function Login() {

    const {setUser} = getUserData()
    const navigate = useNavigate();
    const [showPassword , setShowPassword] = useState(false);
    const [isLoading , setIsLoading] = useState(false);

    const [formData , setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        const {name , value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        
        try {

            setIsLoading(true);

            const res = await api.post('/api/auth/login' , formData , {headers: {
                "Content-Type":"application/json"
            }})



            if(res.data.success){
                localStorage.setItem("accessToken", res.data.accessToken)
                setUser(res.data.user)
                navigate('/dashboard')
                toast.success(res.data.message)
            }
            


        } catch (error) {
            console.log(error);
            
        } finally {
            setIsLoading(false)
        }
    }


  return (
    <div className="bg-[#111729] min-h-screen flex items-center justify-center px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >

                <h1 className="text-3xl font-semibold text-center text-white">
                    Sign in
                </h1>

                <p className="text-gray-400 text-center mt-2 mb-8">
                    Login in to your AlgoTrack account
                </p>

                {/* Email */}

                <div className="mb-4">
                    <label className="text-sm text-gray-300 mb-2 block">
                        Email
                    </label>

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
                    
                    <label className="text-sm text-gray-300 mb-2 flex justify-between">
                        Password
                    <Link to="/forgot-password" className='text-right mb-1 text-blue-500'>Forgot Password?</Link>
                    </label>
                    
                    <div className='relative flex items-center w-full h-12 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500'>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full h-12 rounded-xl pl-4 border-white/10  text-white outline-none focus:border-indigo-500"
                    />

                    <div className='absolute right-5 text-gray-500 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                    {
                        showPassword ? (<EyeOff/>) : (<EyeIcon/>)
                    }   
                    </div>
                    </div>
                </div>

                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
                >
                    {isLoading ? "Signing in..." : "Sign in"}
                </button>

                <p className="text-center text-gray-400 mt-6">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="ml-2 text-indigo-400 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </form>

        </div>
  )
}

export default Login