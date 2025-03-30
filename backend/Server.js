const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');
const router = require('./route/userRoute');
const reportRouter = require('./route/reportRoute');
const notifyRouter = require('./route/notifyRoute');
const cors = require("cors");
const fileCreate = require('./middleware/folderCreator');
const ChatRouter = require('./route/ChatRoute');


connectDB();
app.use(cors());
app.use(express.json());
fileCreate();

// ✅ Serve images properly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send("Hello, Server is running!");
});

app.use("/notify", notifyRouter);
app.use("/", router);
app.use("/item", reportRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
