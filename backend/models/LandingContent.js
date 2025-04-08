const mongoose = require("mongoose");

const LandingSchema = new mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model("LandingContent", LandingSchema);
