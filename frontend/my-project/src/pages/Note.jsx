import notesImg from "../assets/notes.png";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { NoteCard } from "../components/NoteCard";
import { IoIosAddCircle } from "react-icons/io";
import { Modalpage } from "../components/Modal";
import { Alert } from "../components/AlertModal";
import { toast } from "react-toastify";

export const NotePage = () => {
    const storedUserData = localStorage.getItem("user");
    const userData = JSON.parse(storedUserData);
    const userName = userData.name;
    const accesstoken = "Bearer " + userData.token;
    const [formData, updateFormData] = useState("");
    const [noteId, setNoteId] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const handleAleart = () => {
        setOpenModal(!openModal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = {
            Authorization: accesstoken,
        };
        const payload = {
            title: formData.name,
            content: formData.content,
        };
        try {
            console.log(formData.name);
            if(formData.name ===undefined){
                toast.error("title must have 3 character");
            }
            else{
                if (formData.name.trim().length >= 3) {
                    const res = await axios.post(
                        `http://localhost:3000/note/create`,
                        payload,
                        { headers }
                    );
                    if (res.data.message === "sucess") {
                        toast.success("Created Successfully");
                    } else {
                        toast.error(res.data.message);
                    }
                }
                else {
                    toast.error("title must have 3 character");
                }
            }
        } catch (error) {
            console.error(error);
        }
        setOpen(false);
        updateFormData("");
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(false);
    };

    const [updateNote, setUpdate] = useState(false);
    const handleUpdate = () => {
        setUpdate(!updateNote);
    };

    const [selectedOption, setSelectedOption] = useState("");
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        console.log(inputValue);
    };

    const [notes, setNote] = useState([]);
    useEffect(() => {
        const getAllnote = async () => {
            const headers = {
                Authorization: accesstoken,
            };
            try {
                if (inputValue.length === 0) {
                    const res = await axios.get(
                        `http://localhost:3000/note/sort?sortBy=${selectedOption}`,
                        { headers }
                    );
                    setNote(res.data.users);
                } else if (selectedOption === "title" || selectedOption === "") {
                    const res = await axios.get(
                        `http://localhost:3000/note/sort?sortBy=title&searchbyTitle=${inputValue}&sortOrder=desc`,
                        { headers }
                    );
                    setNote(res.data.users);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getAllnote();
    }, [selectedOption, inputValue, open, openModal, updateNote]);

    const allNotes = notes.map((element) => {
        return (
            <NoteCard
                key={element.title}
                note={element}
                openModal={openModal}
                setOpenModal={setOpenModal}
                noteId={noteId}
                setNoteId={setNoteId}
                handleUpdate={handleUpdate}
            />
        );
    });

    return (
        <>
            <nav className="bg-blue-500 p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex justify-center items-center">
                        <img className="w-10" src={notesImg} alt="notes image" />
                        <Link to="/" className="text-white text-2xl font-bold">
                            Note App
                        </Link>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <p className="text-white text-xl font-bold">hi {userName}</p>
                        <Link
                            to="/login"
                            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition"
                        >
                            LogOut
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="my-5">
                <div className="flex w-200 justify-center ">
                    <select
                        className="note border-slate-200 rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        id="notes"
                        onChange={handleChange}
                        value={selectedOption}
                    >
                        <option value="Sortby" disabled>
                            Sortby
                        </option>
                        <option value="">All</option>
                        <option value="title">Title</option>
                        <option value="timestamps">Date</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-28 py-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
                            placeholder="Search note..."
                        />

                        <button
                            className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-2 mt-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 mr-1.5"
                            >
                                <path d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
                            </svg>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {openModal && (
                <Alert
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    handleOpen={handleAleart}
                    noteId={noteId}
                />
            )}

            <Modalpage
                setOpen={setOpen}
                open={open}
                handleOpen={handleOpen}
                accesstoken={accesstoken}
                formData={formData}
                updateFormData={updateFormData}
                handleSubmit={handleSubmit}
                content=""
            />
            <div className="flex flex-wrap justify-center gap-2">{allNotes}</div>
            <button className="absolute top-[70vh]  lg:top-[85vh] right-[30px] ">
                <IoIosAddCircle
                    style={{ fontSize: "4em", cursor: "pointer" }}
                    onClick={() => setOpen(true)}
                />
            </button>
        </>
    );
};
