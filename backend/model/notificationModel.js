const { default: mongoose } = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: String,
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "ReportItem" }, // Item related to notification
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });

const Notification  = mongoose.model("notification", notificationSchema);

module.exports = Notification 