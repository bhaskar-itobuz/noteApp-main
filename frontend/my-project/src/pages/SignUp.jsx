import { ToastContainer, toast } from 'react-toastify';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../validation/validationSchema";
import { Link } from 'react-router-dom';
import axios from "axios";

export const RegistrationForm = () => {

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registrationSchema),
    });
    const notify = () => {
        // Calling toast method by passing string
        toast("Hello Geeks");
    };
    const onSubmit = async (data) => {
        const payload = {
            email: data.email,
            userName: data.name,
            password: data.password,
        }
        await axios({
            method: 'post',
            url: 'http://localhost:3000/user/create',
            data: payload,

        }).then(function (response) {
            const mesg = response.data.message;
            const notify = () => toast(mesg);
            console.log(response.data.message);
        }).catch(function (error) {
            console.log(error);
        });

        reset({
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block font-medium">Name:</label>
                            <input type="text" {...register("name")} className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400" />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium">Email:</label>
                            <input type="email" {...register("email")} className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400" />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium">Password:</label>
                            <input type="password" {...register("password")} className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400" />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                        <div>
                            <label className="block font-medium">Confirm Password:</label>
                            <input type="password" {...register("confirmPassword")} className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400" />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <button type="submit" onClick={notify} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                            Register
                        </button>
                        <p className="text-center mt-4 text-gray-600">
                            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};
