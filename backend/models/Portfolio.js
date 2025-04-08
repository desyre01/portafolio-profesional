const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
