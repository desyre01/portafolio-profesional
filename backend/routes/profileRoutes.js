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
  deleteSocialFromProfile,
  addSocialsToProfile,
  getSocialsFromProfile,
  markTutorialAsSeen,
  createFullPortfolio
} = require("../controllers/profileController");

const router = express.Router();

// Validaciones
const validateProfile = [
  body("name").notEmpty().withMessage("Nombre es requerido"),
  body("profession").notEmpty().withMessage("Profesión es requerida"),
  body("email").isEmail().withMessage("Email inválido"),
  body("phone").notEmpty().withMessage("Teléfono es requerido"),
  body("location").notEmpty().withMessage("Ubicación es requerida"),
];

const validateEducation = [
  body("institution").notEmpty(),
  body("degree").notEmpty(),
  body("startDate").notEmpty(),
  body("endDate").notEmpty(),
];

const validateExperience = [
  body("company").notEmpty(),
  body("position").notEmpty(),
  body("startDate").notEmpty(),
  body("endDate").notEmpty(),
];

const validateProject = [
  body("name").notEmpty(),
  body("description").notEmpty(),
  body("technologies").notEmpty(),
  body("link").optional({ nullable: true, checkFalsy: true }).isURL().withMessage("URL inválida")
];

const validateSkill = [
  body("name").notEmpty(),
  body("category").notEmpty(),
  body("level").isInt({ min: 1, max: 5 }),
];

const validateLanguage = [
  body("language").notEmpty(),
  body("level").notEmpty(),
];

const validateReference = [
  body("name").notEmpty(),
  body("relationship").notEmpty(),
  body("testimony").notEmpty(),
  body("imageURL").optional({ nullable: true, checkFalsy: true }).isURL().withMessage("URL inválida")
];

const validateSocials = [
  body("linkedin").optional({ nullable: true, checkFalsy: true }).isURL().withMessage("LinkedIn debe ser una URL válida"),
  body("github").optional({ nullable: true, checkFalsy: true }).isURL().withMessage("GitHub debe ser una URL válida"),
  body("twitter").optional({ nullable: true, checkFalsy: true }).isURL().withMessage("Twitter debe ser una URL válida"),
  body("facebook").optional({ nullable: true, checkFalsy: true }).isURL().withMessage("Facebook debe ser una URL válida"),
  body("instagram").optional({ nullable: true, checkFalsy: true }).isURL().withMessage("Instagram debe ser una URL válida"),
];

// PERFIL
router.post("/", validateProfile, createProfile);
router.get("/", getAllProfiles);
router.get("/:id", getProfile);
router.put("/:id", validateProfile, updateProfile);
router.delete("/:id", deleteProfile);

// EDUCACIÓN
router.post("/:id/education", validateEducation, addEducationToProfile);
router.put("/:id/education/:eduId", validateEducation, updateEducationInProfile);
router.delete("/:id/education/:eduId", deleteEducationFromProfile);

// EXPERIENCIA
router.post("/:id/experience", validateExperience, addExperienceToProfile);
router.put("/:id/experience/:expId", validateExperience, updateExperienceInProfile);
router.delete("/:id/experience/:expId", deleteExperienceFromProfile);

// PROYECTOS
router.post("/:id/projects", validateProject, addProjectToProfile);
router.put("/:id/projects/:projectId", validateProject, updateProjectInProfile);
router.delete("/:id/projects/:projectId", deleteProjectFromProfile);

// HABILIDADES
router.post("/:id/skills", validateSkill, addSkillToProfile);
router.put("/:id/skills/:skillId", validateSkill, updateSkillInProfile);
router.delete("/:id/skills/:skillId", deleteSkillFromProfile);

// IDIOMAS
router.post("/:id/languages", validateLanguage, addLanguageToProfile);
router.put("/:id/languages/:langId", validateLanguage, updateLanguageInProfile);
router.delete("/:id/languages/:langId", deleteLanguageFromProfile);

// REFERENCIAS
router.post("/:id/references", validateReference, addReferenceToProfile);
router.put("/:id/references/:refId", validateReference, updateReferenceInProfile);
router.delete("/:id/references/:refId", deleteReferenceFromProfile);

// REDES SOCIALES
router.get('/:id/socials', getSocialsFromProfile);
router.post('/:id/socials', validateSocials, addSocialsToProfile);
router.put('/:id/socials', validateSocials, updateSocialsInProfile);
router.delete('/:id/socials/:socialType', deleteSocialFromProfile);

// TUTORIAL
router.put("/:id/tutorial", markTutorialAsSeen);

// GUARDAR PORTAFOLIO COMPLETO
router.post("/full", createFullPortfolio);

module.exports = router;