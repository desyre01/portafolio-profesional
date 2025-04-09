const express = require("express");
const { body } = require("express-validator");
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllProfiles,
  addEducationToProfile,
  updateEducationInProfile,
  deleteEducationFromProfile,
  addExperienceToProfile,
  updateExperienceInProfile,
  deleteExperienceFromProfile,
  addProjectToProfile,
  updateProjectInProfile,
  deleteProjectFromProfile,
  addSkillToProfile,
  updateSkillInProfile,
  deleteSkillFromProfile,
  addLanguageToProfile,
  updateLanguageInProfile,
  deleteLanguageFromProfile,
  addReferenceToProfile,
  updateReferenceInProfile,
  deleteReferenceFromProfile,
  updateSocialsInProfile,
  updateHasSeenTutorial, 
} = require("../controllers/profileController");

const router = express.Router();

// 🧾 Validaciones
const validateProfile = [
  body("name").notEmpty().withMessage("Nombre es requerido"),
  body("profession").notEmpty().withMessage("Profesión es requerida"),
  body("email").isEmail().withMessage("Email inválido"),
  body("phone").notEmpty().withMessage("Teléfono es requerido"),
  body("location").notEmpty().withMessage("Ubicación es requerida"),
];

const validateEducation = [
  body("institution").notEmpty().withMessage("Institución es requerida"),
  body("degree").notEmpty().withMessage("Grado es requerido"),
  body("startDate").notEmpty().withMessage("Fecha de inicio es requerida"),
  body("endDate").notEmpty().withMessage("Fecha de fin es requerida"),
];

const validateExperience = [
  body("company").notEmpty().withMessage("Nombre de la empresa es requerido"),
  body("position").notEmpty().withMessage("Cargo es requerido"),
  body("startDate").notEmpty().withMessage("Fecha de inicio es requerida"),
  body("endDate").notEmpty().withMessage("Fecha de fin es requerida"),
];

const validateProject = [
  body("name").notEmpty().withMessage("Nombre del proyecto es requerido"),
  body("description").notEmpty().withMessage("Descripción es requerida"),
  body("technologies").notEmpty().withMessage("Tecnologías usadas es requerida"),
  body("link").optional().isURL().withMessage("El enlace debe ser válido"),
];

const validateSkill = [
  body("name").notEmpty().withMessage("Nombre de la habilidad es requerido"),
  body("category").notEmpty().withMessage("Categoría es requerida"),
  body("level").isInt({ min: 1, max: 5 }).withMessage("El nivel debe estar entre 1 y 5"),
];

const validateLanguage = [
  body("language").notEmpty().withMessage("El idioma es requerido"),
  body("level").notEmpty().withMessage("El nivel es requerido"),
];

const validateReference = [
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("relationship").notEmpty().withMessage("La relación es requerida"),
  body("testimony").notEmpty().withMessage("El testimonio es requerido"),
  body("imageURL").optional().isURL().withMessage("La URL de imagen debe ser válida"),
];

// 📌 Rutas de Perfil
router.post("/", validateProfile, createProfile);
router.get("/", getAllProfiles);
router.get("/:id", getProfile);
router.put("/:id", validateProfile, updateProfile);
router.delete("/:id", deleteProfile);

// 📚 Educación
router.post("/:id/education", validateEducation, addEducationToProfile);
router.put("/:id/education/:eduId", validateEducation, updateEducationInProfile);
router.delete("/:id/education/:eduId", deleteEducationFromProfile);

// 💼 Experiencia
router.post("/:id/experience", validateExperience, addExperienceToProfile);
router.put("/:id/experience/:expId", validateExperience, updateExperienceInProfile);
router.delete("/:id/experience/:expId", deleteExperienceFromProfile);

// 📁 Proyectos
router.post("/:id/projects", validateProject, addProjectToProfile);
router.put("/:id/projects/:projectId", validateProject, updateProjectInProfile);
router.delete("/:id/projects/:projectId", deleteProjectFromProfile);

// 🛠️ Habilidades
router.post("/:id/skills", validateSkill, addSkillToProfile);
router.put("/:id/skills/:skillId", validateSkill, updateSkillInProfile);
router.delete("/:id/skills/:skillId", deleteSkillFromProfile);

// 🌍 Idiomas
router.post("/:id/languages", validateLanguage, addLanguageToProfile);
router.put("/:id/languages/:langId", validateLanguage, updateLanguageInProfile);
router.delete("/:id/languages/:langId", deleteLanguageFromProfile);

// 🧾 Referencias
router.post("/:id/references", validateReference, addReferenceToProfile);
router.put("/:id/references/:refId", validateReference, updateReferenceInProfile);
router.delete("/:id/references/:refId", deleteReferenceFromProfile);

// 📱 Redes Sociales
router.put("/:id/socials", updateSocialsInProfile);

// 🚀 Tutorial Interactivo
router.put("/:id/tutorial", updateHasSeenTutorial); 

module.exports = router;

