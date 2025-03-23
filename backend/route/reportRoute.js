const express  = require('express');
const { singleItem, listReport, newReport, listCurrentUserReport, updateReport } = require('../controller/reportContoller');
const { searchItem } = require('../controller/serachController');
const upload = require('../middleware/multerMiddleware');
const reportRouter = express.Router();


reportRouter.get("/i/:id", singleItem)
.get('/u/:id',listCurrentUserReport)
.get('/search', searchItem)
.get('/', listReport)
.post('/',upload.single("images"), newReport)
.put('/update/:id',upload.single('images'),updateReport)

module.exports= reportRouter;