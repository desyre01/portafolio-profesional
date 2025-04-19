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
  body("name")
    .notEmpty().withMessage("El nombre del proyecto es requerido"),
  body("description")
    .notEmpty().withMessage("La descripción es requerida"),
  body("technologies")
    .custom((value) => {
      if (!value) return false;
      if (typeof value === 'string') return value.length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return false;
    })
    .withMessage("Debe incluir al menos una tecnología"),
  body("link")
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    })
    .withMessage("El enlace debe ser una URL válida")
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
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("relationship").notEmpty().withMessage("La relación es requerida"),
  body("testimony").notEmpty().withMessage("El testimonio es requerido"),
  body("imageURL")
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    })
    .withMessage("La URL de la imagen debe ser válida o estar vacía")
];

const validateSocials = [
  body("linkedin")
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    })
    .withMessage("LinkedIn debe ser una URL válida o estar vacía"),
  body("github")
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    })
    .withMessage("GitHub debe ser una URL válida o estar vacía"),
  body("twitter")
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    })
    .withMessage("Twitter debe ser una URL válida o estar vacía"),
  body("portfolio")
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    })
    .withMessage("Portfolio debe ser una URL válida o estar vacía")
];

// Rutas de Perfil
router.post("/", [...validateProfile], createProfile);
router.get("/", getAllProfiles);
router.get("/:id", getProfile);
router.put("/:id", [...validateProfile], updateProfile);
router.delete("/:id", deleteProfile);

// Educación
router.post("/:id/education", [...validateEducation], addEducationToProfile);
router.put("/:id/education/:eduId", [...validateEducation], updateEducationInProfile);
router.delete("/:id/education/:eduId", deleteEducationFromProfile);

// Experiencia
router.post("/:id/experience", [...validateExperience], addExperienceToProfile);
router.put("/:id/experience/:expId", [...validateExperience], updateExperienceInProfile);
router.delete("/:id/experience/:expId", deleteExperienceFromProfile);

// Proyectos
router.post("/:id/projects", [...validateProject], addProjectToProfile);
router.put("/:id/projects/:projectId", [...validateProject], updateProjectInProfile);
router.delete("/:id/projects/:projectId", deleteProjectFromProfile);

// Habilidades
router.post("/:id/skills", [...validateSkill], addSkillToProfile);
router.put("/:id/skills/:skillId", [...validateSkill], updateSkillInProfile);
router.delete("/:id/skills/:skillId", deleteSkillFromProfile);

// Idiomas
router.post("/:id/languages", [...validateLanguage], addLanguageToProfile);
router.put("/:id/languages/:langId", [...validateLanguage], updateLanguageInProfile);
router.delete("/:id/languages/:langId", deleteLanguageFromProfile);

// Referencias
router.post("/:id/references", [...validateReference], addReferenceToProfile);
router.put("/:id/references/:refId", [...validateReference], updateReferenceInProfile);
router.delete("/:id/references/:refId", deleteReferenceFromProfile);

// Redes Sociales
router.get('/:id/socials', getSocialsFromProfile);
router.post('/:id/socials', validateSocials, addSocialsToProfile);
router.put('/:id/socials', validateSocials, updateSocialsInProfile);
router.delete('/:id/socials/:socialType', deleteSocialFromProfile);

// Tutorial
router.put("/:id/tutorial", markTutorialAsSeen);

module.exports = router; 