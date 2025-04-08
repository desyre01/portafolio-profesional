const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

// Guardar un nuevo portafolio
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newPortfolio = new Portfolio({ name, description });
    await newPortfolio.save();
    res.json(newPortfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
