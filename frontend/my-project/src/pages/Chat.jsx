
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3000");

function Chatpage() {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const sendMessage = () => {
        socket.emit("send_data", { message });
    };

    useEffect(() => {
        socket.on("received_message", (data) => {
            setMessageReceived(data.message);
        })
    }, [socket])

    return (
        <div className="w-[90vw] m-auto">
            <div className="w-[80vw] flex justify-center mt-4 gap-3">
                <input
                    placeholder="Message..."
                    className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition w-[50vw] border"
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }} />
                <button onClick={sendMessage} className="bg-green-600 text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition text-black"> Send Message</button>
            </div>
            {messageReceived}
        </div>
    );
}

export default Chatpage;