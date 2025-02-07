import React from "react";

export const NoteCard = ({ note }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-[50%] md:w-[30%] lg:w-[33%] min-h-64">
            <h3 className="text-xl font-bold">{note.title}</h3>
            <p className="text-gray-700">{note.content}</p>
        </div>
    );
};
