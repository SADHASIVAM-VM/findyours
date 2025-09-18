import React, { useState, useEffect, useRef } from "react";
import {
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { socket } from "../lib/socket";
import { useCon } from "../controller/ContextController";

const ChatRoom = () => {
  const { user, currentMessageReciverId, setCurrentMessageReciverId } = useCon();

  const currentSenderId = String(localStorage.getItem("currentSenderId") || "");
  const [activeUser, setActiveUser] = useState(currentMessageReciverId || "");
  const [displayMessage, setDisplayMessage] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const getInpMessage = useRef();

  // all messages
  const fetchAllMessages = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SOCKET_URL + `all`);
      const result = await response.json();
      setAllMessages(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Error fetching all messages:", err);
    }
  };

  //  active user chat
  const fetchChatMessages = async (receiverId) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SOCKET_URL + `messages/${currentSenderId}/${receiverId}`
      );
      const result = await response.json();
      setDisplayMessage(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Error fetching chat messages:", err);
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  // 🔹 Build sidebar chat partners list
  const chatPartners =
    allMessages?.reduce((acc, msg) => {
      const partnerId = msg.senderId === currentSenderId ? msg.receiverId : msg.senderId;
      if (!acc[partnerId]) {
        acc[partnerId] = msg; // store last message
      }
      return acc;
    }, {}) || {};

  const members =
    Object.entries(chatPartners).map(([userId, lastMsg]) => ({
      userId,
      lastMsg,
    })) || [];

  // 🔹 Listen for real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      console.log("New message from socket:", msg);

      // Only add to current chat if it's for the active user
      if (
        (msg.senderId === activeUser && msg.receiverId === currentSenderId) ||
        (msg.senderId === currentSenderId && msg.receiverId === activeUser)
      ) {
        setDisplayMessage((prev) => [...prev, msg]);
      }

      // Always update sidebar messages
      setAllMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [activeUser, currentSenderId]);

  // 🔹 Send a message
  const handleSendMessage = () => {
    const newMessage = getInpMessage?.current?.value;
    if (!newMessage.trim()) return;

    const msgObj = {
      message: newMessage,
      senderId: currentSenderId,
      receiverId: activeUser,
    };

    // Emit to server
    socket.emit("sendMessage", msgObj);

    // Optimistic UI update
   

    getInpMessage.current.value = "";
  };


  return (
    <div className="w-full h-[90vh] flex flex-col lg:grid lg:grid-cols-4 gap-3 px-4 md:px-16 bg-black">
      {/* Mobile toggle bar */}
      <div className="flex lg:hidden justify-between items-center py-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <UsersIcon className="w-6 h-6" /> Chat Room
        </h2>
        <button onClick={() => setShowMembers(!showMembers)} className="text-white">
          {showMembers ? <XMarkIcon className="w-7 h-7" /> : <UsersIcon className="w-7 h-7" />}
        </button>
      </div>

      {/* Chat members */}
      <div
        className={`lg:col-span-1 ${
          showMembers ? "block" : "hidden"
        } lg:block border-r border-gray-700 h-full p-3 bg-black rounded-md`}
      >
        <ul className="flex flex-col gap-2">
          {members.map((m) => (
            <li
              key={m.userId}
              className={`cursor-pointer flex items-center gap-3 border-b border-gray-700 last:border-none p-3 rounded-md transition 
                ${
                  activeUser === m.userId
                    ? "bg-yellow-400 text-black"
                    : "hover:bg-gray-700 hover:scale-[1.02] text-white"
                }`}
              onClick={() => {
                setActiveUser(m.userId);
                setCurrentMessageReciverId(m.userId);
                fetchChatMessages(m.userId);
                if (!window.matchMedia("(min-width: 1024px)").matches) {
                  setShowMembers(false);
                }
              }}
            >
              <UserCircleIcon className="w-7 h-7" />
              <div>
                <p className="capitalize">{m.userId}</p>
                <small className="text-gray-400">{m.lastMsg.message}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat window */}
      <div className="lg:col-span-3 bg-[url('https://img.freepik.com/free-vector/abstract-chat-box-shape-pattern-white-background_1017-59690.jpg?semt=ais_incoming&w=740&q=80')] bg-no-repeat bg-cover  bg-opacity-5 flex-1 border border-gray-700 overflow-hidden w-full rounded-md flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 text-black font-semibold bg-white/80 flex items-center gap-3">
          <UserCircleIcon className="w-7 h-7 text-red-400" />
          <span className="capitalize">
            Chatting with{" "}
            <span className="font-light text-sm bg-black p-1 rounded-md text-[#e4ff75]">
              {activeUser}
            </span>
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col max-w-3xl mx-auto gap-3">
            {displayMessage?.map((msg, i) => (
              <div key={i} className="w-full">
                <p
                  className={`${
                    msg.senderId === currentSenderId
                      ? "bg-blue-200 float-right"
                      : "bg-yellow-100"
                  } p-2 px-5 rounded-md flex max-w-fit`}
                >
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="p-3 border-t text-black border-gray-700 flex items-center gap-2">
          <input
            ref={getInpMessage}
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-md bg-violet-50 text-black outline-none"
            onKeyDown={(e)=> {if(e.key == "Enter") return handleSendMessage() }}
          />
          <button
            className="p-3 rounded-md bg-yellow-500 hover:bg-blue-500 text-white flex items-center justify-center"
            onClick={handleSendMessage}
          >
            <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
