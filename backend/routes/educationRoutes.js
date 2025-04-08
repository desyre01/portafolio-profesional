const express = require("express");
const router = express.Router();
const {
  createEducation,
  getEducationByProfile,
  updateEducation,
  deleteEducation
} = require("../controllers/educationController");

// Rutas
router.post("/", createEducation);
router.get("/:profileId", getEducationByProfile);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

module.exports = router;
