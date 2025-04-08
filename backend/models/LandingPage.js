const mongoose = require("mongoose");

const landingPageSchema = new mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model("LandingPage", landingPageSchema);
