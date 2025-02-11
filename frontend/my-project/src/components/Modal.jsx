import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function Modalpage({ setOpen, open, handleOpen ,accesstoken,formData,updateFormData}) {
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = async(e) => {

        e.preventDefault()
        const headers = {
            'Authorization': accesstoken,
        };
        const payload = {
            title: formData.name,
            content: formData.content,
        };
        try {
            console.log("post",accesstoken);
            const res = await axios.post(`http://localhost:3000/note/create`,payload,{ headers })
            console.log(res);
            if(res.data.message==="sucess"){
                toast.success(res.data.message);
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
        setOpen(false);
    };

    return (
        <>
            <Dialog
                className="bg-gray-600 w-[400px] m-auto mt-[20vh]"
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader className="text-white">Create Note</DialogHeader>
                <DialogBody>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name="name" id="name" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" onChange={handleChange} />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                            <textarea id="description" name="content" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here" onChange={handleChange}></textarea>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1 p-3"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" className="bg-sky-950 p-3" onClick={handleSubmit}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}