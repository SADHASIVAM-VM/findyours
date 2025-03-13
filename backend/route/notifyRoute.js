const express = require("express");
const { fetchNot, updateNotify } = require("../controller/notificatonController");
const notifyRouter = express.Router();

notifyRouter.get('/', fetchNot)
.put('/:id', updateNotify)


module.exports= notifyRouter;