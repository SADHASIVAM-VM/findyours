
const { mongo } = require("mongoose");
const reportModel = require("../model/reportItemModel");
const { findMatchingLostItems, findMatchingFoundItems } = require("./notificatonController");


const newReport = async (req, res) => {
    
    console.log(req.file)
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
            }
            const filePaths = `/uploads/${req.file.filename}`
            console.log(filePaths)
            console.log({ message: "Files uploaded successfully", files: filePaths });
          

        const { user_id, itemType, itemName, description, category, location, reward, dateLostOrFound,contactNumber, status, reportedBy, claimedBy, isVerified } = req.body;

        // Ensure required fields are provided (Basic Validation)
        if (!user_id || !itemType || !itemName || !description || !category || !location) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        // Create a new report
        const newreport = new reportModel({
            user_id,
            itemType,
            itemName,
            description,
            category,
            location,
            reward,
            dateLostOrFound,
            images:filePaths,
            status,
            reportedBy,
            claimedBy,
            isVerified,
            contactNumber
        });

        // Call matching functions with await
        if (itemType === "found") {
            await findMatchingLostItems(newreport);
        }
        if (itemType === "lost") {
            await findMatchingFoundItems(newreport);
        }

        // Save the report
        const nn = await newreport.save();
        if (!nn) {
            return res.status(400).json({ msg: "Unable to post" });
        }

        return res.status(200).json({ msg: "Post successfully", data: nn });

    } catch (err) {
        console.error("Error:", err); // Log the actual error
        res.status(500).json({ msg: err.message });
    }
};

const listReport= async(req, res)=>{
        try{
            const items = await reportModel.find({}).populate('reportedBy', 'name');
            if(!items || items.length <= 0){
                return res.status(400).json({msg:"no items"})
            }
            res.status(200).json({msg:"list of items", data:items})
        }
    
    catch(err){
        res.status(500).json({msg:err})
        }}


const singleItem = async(req, res)=>{
    const {id} = req.params;

    try{
        const findItem = await reportModel.find({_id: id}).populate("reportedBy")
        if(!findItem || findItem.length <= 0 ){
            return res.status(400).json({msg:"unable find item"})
        }
        res.status(200).json({msg:"Item founded", data:findItem})
    }
    catch(err){
        res.status(500).json({msg:"internal Eror"})
    }}

const listCurrentUserReport= async(req, res)=>{
    const {id} = req.params;
    
    
    try{
            
            const items = await reportModel.find({reportedBy:id});
            if(!items || items.length <= 0){
                return res.status(400).json({msg:"no items"})
            }
            res.status(200).json({msg:"list of items", data:items})
        }
    
    catch(err){
        res.status(500).json({msg:err})
        }}

const updateReport = async(req, res)=>{
    const {id} = req.params;
    const { itemName, description, category, location, reward,contactNumber, images} = req.body;
//    console.log(itemName)
const file = req.file
console.log(file)

    try{
        const updateObject = {}
        if(description !== undefined) updateObject.description = description;
        if(reward !== undefined) updateObject.description = reward;
        if(itemName !== undefined) updateObject.itemName = itemName;
        if(category !== undefined) updateObject.category = category;
        if(location !== undefined) updateObject.location = location;
        if(contactNumber !== undefined) updateObject.contactNumber = contactNumber;
        if(images !== undefined) updateObject.images = `/uploads/${req.file.filename}`;

        if ((updateObject).length === 0) {
            return res.status(400).json({ error: "No fields provided for update" });
          }

       await reportModel.updateOne({_id:id},{$set:updateObject})
        
    res.status(200).json({
      message: "item updated successfully!",
 
    });
    }
    catch(err){
        res.status(500).json({msg:"internal Eror"})
    }
}


    module.exports={newReport,listReport,singleItem,listCurrentUserReport, updateReport};