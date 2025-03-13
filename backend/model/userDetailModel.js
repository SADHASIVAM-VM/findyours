const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id:{
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profile_url: {
    type: String,
    default: null, 
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false, // True if email/phone is verified
  },
  createdAt: {
    type: Date,
    default: Date.now, // Stores the date when the user registered
  },
});
const userModel = mongoose.model("User", UserSchema);
module.exports = userModel
