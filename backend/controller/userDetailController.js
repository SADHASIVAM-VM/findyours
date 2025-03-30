const userModel = require("../model/UserDetailModel");

const createUser = async(req, res)=>{
const {name, user_id, email, profile_url, password, phone,role,isVerified } = req.body;

try{
    // if(!name || !email ) return res.status(400).json({msg:"fields missing"})
// unique email login 
    const newUser = new userModel({
       user_id,name,email, profile_url,password, phone,role,isVerified
    })
    const nn = await newUser.save();

    if(!nn){
        return res.status(400).json({msg:"unable create user"})
    }
    res.status(200).json({msg:"user created successfully", data:nn})


}
catch(err){
    res.status(500).json({msg:err})
}}


// profile Update

const userUpdate =async(req, res)=>{
    const {user_id, name, profile_url, password, phone } = req.body;
    try{
        const findUser = find({user_id:user_id});
        const updateUser= {}
        if(!findUser){
            return res.status(400).json({msg:"User isn't found"})
        }
        if(name !== undefined) updateUser.name = name;
        if(profile_url !== undefined) updateUser.profile_url = profile_url;
        if(password !== undefined) updateUser.password = password;
        if(phone !== undefined) updateUser.phone = phone;
        updateUser.isVerified = true;

        if (Object.keys(updateUser).length === 0) {
            return res.status(400).json({ error: "No fields provided for update" });
          }


        const newUpdateUser = await userModel.updateMany({user_id:user_id}, {$set:updateUser})

    if(!newUpdateUser){
        return res.status(400).json({msg:"unable update user"})
    }
    return res.status(200).json({msg:"user updated successfully", data:nn})


}
catch(err){
    res.status(500).json({msg:"internal Eror"})
}}



// admin to view users
const listUsers= async(req, res)=>{
    try{
        const users = await userModel.find({});
        if(!users){
            return res.status(400).json({msg:"no users"})
        }
        res.status(200).json({msg:"list of users", data:users})
    }

catch(err){
    res.status(500).json({msg:err})
    }}

const currentUser =async(req, res)=>{
    const {email}=req.query;
    console.log(email)
try{
    
    const findUser = await userModel.find({email:email});

    if(!findUser){
        return res.status(400).json({msg:"no user found"})
    }
    return res.status(200).json({msg:"Currentuser ", data:findUser})


}
catch(err){
    res.status(500).json({msg:"internal Eror"})
}}


module.exports={createUser,listUsers, userUpdate,currentUser};