const express = require("express");
const LandingPage = require("../models/LandingPage"); // Importar modelo
const router = express.Router();

// Obtener datos de la landing page desde MongoDB
router.get("/", async (req, res) => {
  try {
    const landingData = await LandingPage.findOne();
    if (!landingData) {
      return res.status(404).json({ message: "No hay datos en la base de datos" });
    }
    res.json(landingData);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error });
  }
});

// Insertar contenido de la landing page (ejemplo)
router.post("/", async (req, res) => {
  try {
    const newLanding = new LandingPage(req.body);
    await newLanding.save();
    res.status(201).json({ message: "Landing Page creada", data: newLanding });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar en MongoDB", error });
  }
});

module.exports = router;
