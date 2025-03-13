
const allowedOrigins =["http://localhost:514", "http://localhost:51/"];

const cors_origin =(req, callback)=>{
    let corsOptions;
    if(allowedOrigins.includes(req.header("Origin")) !== -1){
        corsOptions ={origin:true}
    }
    else{
        corsOptions={origin:false}
    }
    callback(null, corsOptions)
}
module.exports = cors_origin;