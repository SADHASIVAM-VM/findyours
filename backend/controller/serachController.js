const reportModel = require("../model/reportItemModel");

const searchItem = async (req, res) => {
    const { location, find } = req.query;
  const filters = {}
  if (location) filters.location = { $regex: `^${location}`, $options: "i" };
  if (find) filters.itemName =  { $regex: `^${find}`, $options: "i" };
  
    const results = await reportModel.find(filters).populate("reportedBy", "name email");
    res.json(results);
  }

  module.exports ={searchItem};