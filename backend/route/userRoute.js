const express = require("express");
const { listUsers, createUser, currentUser } = require("../controller/userDetailController");
const router = express.Router();

router.get('/user/cu/', currentUser)
.get('/user',listUsers)
.post('/user', createUser)
module.exports=router;