import { useState } from "react";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

export default function ChatList() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || !selectedUser) return;
    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), { text: input, sender: "me" }],
    }));
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* User List */}
      <div className="w-1/3 bg-white p-4 border-r">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`p-2 cursor-pointer rounded-md ${
                selectedUser?.id === user.id ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col h-full">
        {selectedUser ? (
          <>
            <div className="bg-blue-500 text-white p-4 text-lg font-bold">
              Chat with {selectedUser.name}
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {(messages[selectedUser.id] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-md w-fit max-w-xs ${
                    msg.sender === "me" ? "ml-auto bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-4 flex border-t bg-white">
              <input
                type="text"
                className="flex-1 border rounded-md p-2"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
