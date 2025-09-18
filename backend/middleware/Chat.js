const express = require("express");
const http = require("http"); // Required to use socket.io with Express
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const messageModel = require("../model/messageModel");


const Message = messageModel
dotenv.config();
const app = express();
app.use(cors())
const server = http.createServer(app); // Create HTTP server

const io = new Server(server, {
    cors: { origin: "*" },
    methods:["GET", "POST"]
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/find")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));



// Chat Socket.io Logic
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async (data) => {
        const { senderId, receiverId, message } = data;
        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();

        io.emit(`receiveMessage`, newMessage);
    });

    socket.on("disconnect", () => console.log("User disconnected"));
});

// API to Fetch Chat Messages
app.get("/messages/:senderId/:receiverId", async (req, res) => {
    const { senderId, receiverId } = req.params;
    const messages = await Message.find({
        $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId }
        ]
    }).sort({ timestamp: 1 });

    res.json(messages);
});

app.get('/all', async (req, res) => {
  try {
    const find = await Message.find();  // ✅ wait for DB result

    if (!find || find.length === 0) {
      return res.status(404).json({ msg: "No messages found" });
    }

    res.status(200).json({ data: find }); // ✅ send clean JSON
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});



// Start Server (Use the Same Port for Backend & Chat)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

