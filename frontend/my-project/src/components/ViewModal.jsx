import { Button, Modal } from "flowbite-react";

export const Viewnote = ({Openview,setOpenview,handleView,title,content}) => {
    return (
        <>
            <Modal show={Openview} className="w-[40vw]" onClose={() => setOpenview(false)} popup>

                <Modal.Body className="bg-gray-700 pt-5 pb-5 w-[40vw] rounded-xl h-[70vh] relative">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 max-w-[90%] border-gray-200 max-h-[70%] overflow-y-scroll break-words no-scrollbar">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                    </div>
                    <div className="p-4 md:p-5 space-y-4 text-white max-h-[70%] max-w-[90%] overflow-y-scroll break-words no-scrollbar">
                        {content}
                    </div>
                    <div className="flex justify-center align-end  absolute bottom-3 left-4 ">
                        <Button className="bg-red-700" color="failure" onClick={handleView}>
                            {"Close"}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
};
