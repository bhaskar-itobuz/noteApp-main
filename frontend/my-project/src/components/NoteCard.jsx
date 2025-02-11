import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { Aleart } from "./AleartModal";
import { useState } from "react";

export const NoteCard = ({ note }) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => {
        setOpenModal(false);
    }
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-[45%] md:w-[30%] lg:w-[32%] min-h-64 relative">
            <h3 className="text-xl font-bold">{note.title}</h3>
            <p className="text-gray-700 ">{note.content}</p>
            <Aleart openModal={openModal} setOpenModal={setOpenModal} handleOpen={handleOpen} />
            <div className="absolute flex bottom-[20px]  right-[20px] gap-[20px]">
                <button><MdDelete style={{ fontSize: '2em', cursor: "pointer" }} onClick={() => setOpenModal(true)}/></button>

                <button ><FaEnvelopeOpenText style={{ fontSize: '2em', cursor: "pointer" }} /></button>
            </div>
            {/* <Aleart openModal={openModal} setOpenModal={setOpenModal} handleOpen={handleOpen} /> */}

        </div>
    );
};
