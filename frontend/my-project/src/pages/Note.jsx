import notesimg from "../assets/notes.png";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { NoteCard } from "../components/NoteCard";

export const NotePage = () => {
    const storedUserData = localStorage.getItem('user');
    const userData = JSON.parse(storedUserData)
    const userName = userData.name;
    const accesstoken = "Bearer " + userData.token;
    console.log(accesstoken);
    const [notes, setNote] = useState([]);
    useEffect(() => {
        const getAllnote = async () => {
            const headers = {
                'Authorization': accesstoken,
            };
            try {
                const res = await axios.get('http://localhost:3000/note/alldata', { headers })
                console.log(res.data.users);
                setNote(res.data.users);
                console.log(notes);
            } catch (error) {
                console.error(error);
            }
        }
        getAllnote();
    }, [])

    const allNotes = notes.map((element) => {
        return (
            <NoteCard note={element}/>
        );
    });

    return (
        <>
            <nav className="bg-blue-500 p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex justify-center items-center">
                        <img className="w-10" src={notesimg} alt="notes image" />
                        <Link to="/" className="text-white text-2xl font-bold">
                            Note App
                        </Link>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <p className="text-white text-xl font-bold">hi {userName}</p>
                        <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition">
                            LogOut
                        </Link>
                    </div>

                </div>
            </nav>
            <div className="flex flex-wrap">  
                {allNotes}
            </div>
        </>
    );
}