const Notification = require("../model/notificationModel");
const reportModel = require("../model/reportItemModel")

const findMatchingLostItems =async(newItem)=>{

   
    const lostItems = await reportModel.find({
        itemType: "lost",
        category: newItem.category,
        location: newItem.location,
      });
      await Promise.all(
        lostItems.map(lostitem => 
          Notification.create({
            userId: lostitem.user_id,
            message: `A new found item matches your lost ${lostitem.category} in ${lostitem.location}!`,
            itemId: lostitem._id
          })
        )
      );
}
const findMatchingFoundItems = async (newItem) => {
    // Find found items matching the lost item
    const foundItems = await reportModel.find({
      type: "found",
      category: newItem.category,
      location: newItem.location,
    });
  
    for (let foundItem of foundItems) {
       new Notification({
        userId: newItem.user_id,
        message: `A new found item matches your lost ${newItem.category}!`,
        itemId: foundItem._id
      });
  
      console.log(`Notification sent to user ${newItem.user_id}`);
    }
  };

 const fetchNot =  async(req, res)=>{
    try{
       const notic = await Notification.find({})
   
       if(!notic || notic.length <=0){
           return res.status(400).json({msg:"no nofic"})
       }
       return res.status(200).json({msg:'notify', data:notic})
   
    }
    catch(err){
       return res.status(500).json({msg:err})
    }}
const updateNotify = async(req, res)=>{
    try{
        const {id} = req.params
    const findMessage = await Notification.findByIdAndUpdate(id, {isRead:true})
    if(!findMessage){
        return res.status(400).json({msg: "Unable to find"})
    }
    res.status(200).json({msg: "Marked"})
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}
module.exports = {findMatchingFoundItems, findMatchingLostItems, fetchNot,updateNotify}

