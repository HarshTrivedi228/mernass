const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  fullName:
   { type: String, required: true },
  mobileNumber: 
  { type: String },
  email:
   { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
