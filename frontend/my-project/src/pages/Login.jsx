import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/validationSchema";
import { Link } from 'react-router-dom';
import axios from "axios";

export const LogIn = () => {
    const { reset, register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema),
    });
    let navigate = useNavigate();
    const onSubmit = async (data) => {
        const payload = {
            email: data.email,
            password: data.password,
        }
        try {
            const response = await axios.post('http://localhost:3000/user/check', payload);
            if (response.data.message === " valid user") {
                toast.success("Login successful!");
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/notepage');
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed!");
            console.error(error);
        }
        reset({
            email: "",
            password: "",
        });
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
                <div className="bg-white p-8 w-full max-w-md shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
                    <form action="#" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block font-medium">Email:</label>
                            <input type="email" defaultValue="sambit@gmail.com" {...register("email")} className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400" />
                            <p className={`text-red-500 text-sm mt-1 min-h-[20px] ${errors.email ? "visible" : "invisible"}`}>
                                {errors.email?.message}
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium">Password:</label>
                            <input type="password" defaultValue="bhas@1234" {...register("password")} className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400" />
                            <p className={`text-red-500 text-sm mt-1 min-h-[20px] ${errors.password ? "visible" : "invisible"}`}>
                                {errors.password?.message}
                            </p>
                        </div>
                        <button type="submit" className="w-full mt-5 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Submit</button>
                        <p className="text-center mt-4 text-gray-600">
                            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>
                        </p>

                    </form>
                </div>
            </div>
        </>
    )
}