const express = require('express')
const { allChat, getChat } = require('../controller/chatController')
const ChatRouter = express.Router()

ChatRouter.get('/chatAll', allChat )
.get("/messages/:senderId/:receiverId", getChat);

module.exports = ChatRouter;
