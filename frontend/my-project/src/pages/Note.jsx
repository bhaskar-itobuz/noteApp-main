
import notesImg from "../assets/notes.png";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import axiosInstance from "axiosInstance";
// import axios from "axios";
import { useState, useRef } from "react";
import { NoteCard } from "../components/NoteCard";
import { IoIosAddCircle } from "react-icons/io";
import { Modalpage } from "../components/Modal";
import { Alert } from "../components/AlertModal";
import { toast } from "react-toastify";
// import axiosInstanceInstance from "../axiosInstanceInstance/axiosInstanceInstance";
import axiosInstance from "../AxiosInstance/AxiosInstance";
import axios from "axios";


export const NotePage = () => {
    const storedUserData = localStorage.getItem("user");
    const userData = JSON.parse(storedUserData);
    const userName = userData.name;
    const userId = userData.userId;
    const profilePicture = userData.profilePicture;
    const accesstoken = "Bearer " + userData.token;
    const [formData, updateFormData] = useState("");
    const [noteId, setNoteId] = useState("");

    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const handleImageClick = () => {
        inputRef.current.click();
    }
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file); // Append file to formData

        try {
            const headers = {
                Authorization: accesstoken,
                // Include Authorization token
            };

            // Making the API call
            const response = await axiosInstance.post(
                `http://localhost:3000/user/upload?userId=${userId}`, // API URL with query param
                formData,
                { headers }
            );

            // Check API response
            console.log(response.data.message);
            if (response.data.message === "File uploaded successfully") {
                toast.success("File uploaded successfully!");
                // setImage(URL.createObjectURL(file)); // Update UI with the new image
                setImage(response.data.imageUrl || file);
            } else {
                toast.error("File upload failed!");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Error uploading file.");
        }
    }

    const [count, setCount] = useState(1);
    const incrementCount = async () => {
        setCount(count + 1);
    };
    const decrementCount = () => {
        setCount(count - 1);
    };

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
            if (formData.name === undefined) {
                toast.error("title must have 3 character");
            }
            else {
                if (formData.name.trim().length >= 3) {
                    const res = await axiosInstance.post(
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
    };

    const [notes, setNote] = useState([]);
    useEffect(() => {
        const getAllnote = async () => {
            const headers = {
                Authorization: accesstoken,
            };
            try {
                if (inputValue.length === 0) {
                    if (count > 0) {
                        const res = await axiosInstance.get(
                            `http://localhost:3000/note/sort?sortBy=${selectedOption}&pageNo=${count}`,
                            { headers }
                        );
                        if (res.data.pageCount < count && count >= 1) {
                            setCount(count - 1);
                            const res = await axiosInstance.get(
                                `http://localhost:3000/note/sort?sortBy=${selectedOption}&pageNo=${count - 1}`,
                                { headers }
                            );
                            if (res.data.pageCount === 0) {
                                setNote([]);
                            }
                            else {
                                setNote(res.data.users);
                            }
                        }
                        else {
                            setNote(res.data.users);
                        }
                    }
                    else {
                        setCount(count + 1);
                    }

                } else if (selectedOption === "title" || selectedOption === "") {
                    const res = await axiosInstance.get(
                        `http://localhost:3000/note/sort?sortBy=title&searchbyTitle=${inputValue}&sortOrder=desc`,
                        { headers }
                    );
                    res.data.status === 200 ?
                        setNote(res.data.users) : setNote([]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        const delayDebounce = setTimeout(() => {
            getAllnote();
        }, 500); // Wait 500ms after the user stops typing before calling API

        return () => clearTimeout(delayDebounce);
    }, [selectedOption, inputValue, open, openModal, updateNote, count, image]);

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


    const [isverify, setVerify] = useState(false);
    const handleLogout = async () => {
        const headers = {
            Authorization: accesstoken,
        };
        try {
            const res = await axiosInstance.get(
                `http://localhost:3000/user/logout`,
                { headers }
            );
            localStorage.removeItem("user");
            toast.success("Logout Successfully");
        } catch (error) {
            console.error(error);
            toast.error("Logout failed");
        }
        setVerify(false);
    };

    // const handleRoom = ()=>{

    // }

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
                        <div onClick={handleImageClick} className="">
                            {/* {image ? (<img src={URL.createObjectURL(image)} alt="fghj" className="w-[30px] h-[30px] rounded-[50%]"/>) : (<img src="" alt="fghj" />)} */}
                            {image ? (
                                <img
                                    src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                    alt="Uploaded"
                                    className="w-[30px] h-[30px] rounded-full"
                                />
                            ) : (
                                <img src={profilePicture} alt="Placeholder" className="w-[30px] h-[30px] rounded-full" />
                            )}
                            <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
                        </div>

                        <Link
                            to="/login"
                            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition"
                            onClick={handleLogout}
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

            <div className="page flex justify-center items-center gap-3 mb-4">
                <button className="w-[20vw] md:w-[10vw] lg:w-[6vw] bg-black text-white p-3" onClick={decrementCount}>Pre</button>
                <p>{count}</p>
                <button className="w-[20vw] md:w-[10vw] lg:w-[6vw] bg-black text-white p-3" onClick={incrementCount}>Next</button>
                <Link
                    to="/chooseUser"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-gray-200 transition"
                >
                    Chat
                </Link>

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