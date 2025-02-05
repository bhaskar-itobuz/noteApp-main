import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/validationSchema";
import { Link } from 'react-router-dom'; 
import axios from "axios";


export const LogIn = () => {
    const { reset,register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = async(data) => {
        const payload = {
            email : data.email,
            password: data.password,
          }
         await axios({
            method: 'post',
            url: 'http://localhost:3000/user/check',
            data: payload, 
    
        }).then(function(response) {
            console.log(response);
        }).catch(function (error){
            console.log(error);});
        
        reset({email: "",
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
                            <input type="email" {...register("email")} className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400" />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium">Password:</label>
                            <input type="password" {...register("password")} className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400" />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
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