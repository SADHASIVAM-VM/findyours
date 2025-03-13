const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ["lost", "found"], // Specifies if the item is lost or found
    required: true,
  },
  user_id:{
type:String
  },
  itemName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  category: {
    type: String,
    lowercase: true
  
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  reward: {
    type: String,
    trim: true,
  },
  dateReported: {
    type: Date,
    default: Date.now,
  },
  dateLostOrFound: {
    type: Date
  },
  images: {
    type: String, // Array of image URLs
    default: [],
  },
  status: {
    type: String,
    enum: ["Open", "Claimed", "Resolved"], // Tracks the item status
    default: "Open",
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who claimed the item
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false, // Admin verification for authenticity
  },
  contactNumber:{
    type:String,
    required:true
  }
}, { timestamps: true });

const reportModel = mongoose.model("ReportItem", ReportSchema);
module.exports = reportModel;


