
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../validation/validationSchema";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const RegistrationForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registrationSchema),
    });

    const onSubmit = async (data) => {
        const payload = {
            email: data.email,
            userName: data.name,
            password: data.password,
        };
        try {
            const response = await axios.post("http://localhost:3000/user/create", payload);
            if (response.data.message === "sucess") {
                toast.success("Registration successful! Check your email for verification.");
                navigate("/login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed!");
            console.error(error);
        }

        reset();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="block font-medium">Name:</label>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
                    </div>

                    <div>
                        <label className="block font-medium">Email:</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                    </div>


                    <div className="relative">
                        <label className="block font-medium">Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                            autoComplete="new-password"
                        />
                        <span
                            className="absolute right-3 top-10 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                        </span>
                        <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                    </div>


                    <div>
                        <label className="block font-medium">Confirm Password:</label>
                        <input
                            type="password"
                            {...register("confirmPassword")}
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Register
                    </button>


                    <p className="text-center mt-4 text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
