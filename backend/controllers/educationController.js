const Education = require("../models/Education");

// Crear una nueva entrada de educación
exports.createEducation = async (req, res) => {
  try {
    const newEntry = new Education(req.body);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las entradas de educación de un perfil
exports.getEducationByProfile = async (req, res) => {
  try {
    const entries = await Education.find({ profileId: req.params.profileId });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una entrada de educación
exports.updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Entrada no encontrada" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una entrada de educación
exports.deleteEducation = async (req, res) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Entrada no encontrada" });
    res.json({ message: "Entrada eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
