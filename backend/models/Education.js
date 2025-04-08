const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Education", educationSchema);
