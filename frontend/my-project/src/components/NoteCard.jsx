import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { Modalpage } from "./Modal";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Viewnote } from "./ViewModal";


export const NoteCard = ({ note, setOpenModal, openModal, setNoteId, handleUpdate }) => {

    const [Openview, setOpenview] = useState(false);
    const handleView =()=>{
        setOpenview(false);
    }

    const storedUserData = localStorage.getItem('user');
    const userData = JSON.parse(storedUserData)
    const accesstoken = "Bearer " + userData.token;

    const handleAleart = () => {
        setNoteId(note._id);
        setOpenModal(!openModal);

    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(false);
    }

    const [formData, updateFormData] = useState({
        name: note.title, content: note.content
    });
    const handleSubmit = async (e) => {
        e.preventDefault()
        const headers = {
            'Authorization': accesstoken,
        };
        const payload = {
            title: formData.name,
            content: formData.content,
        };
        try {
            if (formData.name.trim().length >=3) {
                const res = await axios.put(`http://localhost:3000/note/update/${note._id}`, payload, { headers })
                console.log(res);
                if (res.data.message === "Updated Successfully") {
                    toast.success("update successfully");
                }
                else {
                    toast.error(res.data.message);
                }
            }
            else{
                formData.name=note.title;
                toast.error("title must have 3 character");
            }
        } catch (error) {
            console.error(error);
        }
        setOpen(false);
        handleUpdate();
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-[45%] md:w-[30%] lg:w-[32%] min-h-64 relative">
            <h3 className="text-xl font-bold">{note.title}</h3>
            <p className="text-gray-700 ">{note.content}</p>
            <div className="absolute flex bottom-[20px]  right-[20px] gap-[20px]">

                <Modalpage setOpen={setOpen} open={open} handleOpen={handleOpen} accesstoken={accesstoken} formData={formData} updateFormData={updateFormData} handleSubmit={handleSubmit} title={note.title} content={note.content} />
                <Viewnote Openview={Openview} setOpenview={setOpenview} handleView={handleView} title={note.title} content={note.content}/>

                <button><MdDelete style={{ fontSize: '2em', cursor: "pointer" }} onClick={handleAleart} /></button>
                <button><MdEditDocument style={{ fontSize: '2em', cursor: "pointer" }} onClick={() => setOpen(true)} /></button>
                <button ><FaEnvelopeOpenText style={{ fontSize: '2em', cursor: "pointer" }} onClick={() => setOpenview(true)} /></button>
            </div>

        </div>
    );
};
