import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useCon } from "../controller/ContextController";
import { CheckCircle, TicketCheck } from "lucide-react";

const socket = io("http://localhost:5000", {
    transports: ["websocket"], // Force WebSocket (prevents polling issues)
    withCredentials: true, // Allow cookies if needed
});
export default function ChatComponent() {
    const {MessageId} = useCon()
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Fetch Chat History
    useEffect(() => {
        axios.get(`http://localhost:5000/messages/${MessageId.userId}/${MessageId.receiverId}`)
            .then(res => setMessages(res.data))
            .catch(err => console.error(err));
    }, [MessageId.userId, MessageId.receiverId]);

    // Listen for Incoming Messages
    useEffect(() => {
        socket.on(`receiveMessage_${MessageId.userId}`, (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => socket.off(`receiveMessage_${MessageId.userId}`);
    }, [MessageId.userId]);

    // Send Message
    const sendMessage = () => {
        if (newMessage.trim() === "") return;
        
        const messageData = {
            senderId: MessageId.userId,
            receiverId:MessageId.receiverId,
            message: newMessage
        };

        socket.emit("sendMessage", messageData);
        setMessages((prev) => [...prev, messageData]);
        setNewMessage("");
    };

    return (
        <div className="w-full max-w-4xl flex justify-self-center my-5 flex-col bg-[#e7f3ff] border p-4 rounded-lg shadow-md">
            <h1 className="font-bold text-xl my-2 ">Chat</h1>
            <hr className="border-black" />
            <div className="h-64 overflow-y-auto border-b mb-2 p-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-1 ${msg.senderId === MessageId.userId ? "bg-blue-400 text-white float-right self-end" : "bg-gray-200 float-left text-black self-start"} rounded-lg`}>
                        {msg.message} <CheckCircle size={'10px'}/>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <input 
                    type="text"
                    className="flex-grow p-2 border border-indigo-400 rounded-l"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-r">Send</button>
            </div>
        </div>
    );
}
