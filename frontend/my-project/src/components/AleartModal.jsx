
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function Aleart(openModal, setOpenModal,handleOpen) {
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
                            <Button className="bg-red-700" color="failure" onClick={handleOpen}>
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
