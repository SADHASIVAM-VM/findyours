const express = require('express');
const messageModel = require('../model/messageModel');


const allChat = (req, res)=>{

    try{
        const getAll = messageModel.find();
    if(!getAll) res.status(400).json({msg:'no messages'})
    
    res.status(200).json({msg:getAll})
}
catch(err){
    res.status(500).json({msg:err})

}
}
const getChat = async (req, res) => {
    const { senderId, receiverId } = req.params;
    const messages = await messageModel.find({
        $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId }
        ]
    }).sort({ timestamp: 1 });

    res.json(messages);
};

module.exports = {getChat,allChat}