
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { toast } from 'react-toastify';


export function Alert({ openModal, setOpenModal, handleOpen, noteId }) {
    const storedUserData = localStorage.getItem('user');
    const userData = JSON.parse(storedUserData);
    const accesstoken = "Bearer " + userData.token;
    const handleChange = async () => {
        const headers = {
            'Authorization': accesstoken,
        };
        try {
            const res = await axios.delete(`http://localhost:3000/note/delete/${noteId}`, { headers })
            if (res.data.message === "Delete sucessfully") {
                toast.success(res.data.message);
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
        handleOpen();
    };
    return (
        <>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>

                <Modal.Body className="bg-gray-700 pt-5 pb-5 w-[30vw] rounded-xl">
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4 ">
                            <Button className="bg-red-700" color="failure" onClick={handleChange}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button className="bg-gray-700" color="gray" onClick={handleOpen}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
