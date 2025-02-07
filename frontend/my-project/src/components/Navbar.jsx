import notes from "../assets/notes.png";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex justify-center items-center">
                <img className="w-10" src={notes} alt="notes image" />
                <Link to="/" className="text-white text-2xl font-bold">
                    Note App
                </Link>
                </div>
                <div className="flex gap-3">
                <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition">
                    Login
                </Link>
                <Link to="/register" className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition">
                    Sign Up
                </Link>
                </div>
            </div>
        </nav>
    );
};
