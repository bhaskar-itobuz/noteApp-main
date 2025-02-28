import React, { useState } from "react";

export const Searchbar = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(event.target.value);
    };

    return (
        <>
            <div className="flex w-200 justify-center ">
                <select className="note border-slate-200 rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" id="notes" onChange={handleChange}  >
                    <option value="Sortby" disabled>Sortby</option>
                    <option value="All" >All</option>
                    <option value="title" >Title</option>
                    <option value="date" >Date</option>
                </select>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-28 py-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
                        placeholder="Search note..." />

                    <button
                        className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-2 mt-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 mr-1.5">
                            <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                        </svg>
                        Search
                    </button>
                </div>
            </div>
        </>
    );
};
