const { validationResult } = require("express-validator");
const Profile = require("../models/Profile");

const profileController = {
  // ---------------------- PERFIL ----------------------
  createProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const newProfile = new Profile(req.body);
      const saved = await newProfile.save();
      res.status(201).json(saved);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllProfiles: async (req, res) => {
    try {
      const profiles = await Profile.find();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ error: "Perfil no encontrado" });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const deleted = await Profile.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Perfil no encontrado" });
      res.json({ message: "Perfil eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ---------------------- EDUCACIÓN ----------------------
  addEducationToProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.education.push(req.body);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateEducationInProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      const eduIndex = profile.education.findIndex(edu => edu._id.toString() === req.params.eduId);
      if (eduIndex === -1) return res.status(404).json({ error: "Educación no encontrada" });

      profile.education[eduIndex] = { ...profile.education[eduIndex], ...req.body };
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteEducationFromProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.education = profile.education.filter(edu => edu._id.toString() !== req.params.eduId);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ---------------------- EXPERIENCIA ----------------------
  addExperienceToProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.experience.push(req.body);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateExperienceInProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      const expIndex = profile.experience.findIndex(exp => exp._id.toString() === req.params.expId);
      if (expIndex === -1) return res.status(404).json({ error: "Experiencia no encontrada" });

      profile.experience[expIndex] = { ...profile.experience[expIndex], ...req.body };
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteExperienceFromProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.expId);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ---------------------- PROYECTOS ----------------------
  addProjectToProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.projects.push(req.body);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProjectInProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      const projIndex = profile.projects.findIndex(proj => proj._id.toString() === req.params.projectId);
      if (projIndex === -1) return res.status(404).json({ error: "Proyecto no encontrado" });

      profile.projects[projIndex] = { ...profile.projects[projIndex], ...req.body };
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProjectFromProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.projects = profile.projects.filter(proj => proj._id.toString() !== req.params.projectId);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ---------------------- HABILIDADES ----------------------
  addSkillToProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.skills.push(req.body);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateSkillInProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      const skillIndex = profile.skills.findIndex(skill => skill._id.toString() === req.params.skillId);
      if (skillIndex === -1) return res.status(404).json({ error: "Habilidad no encontrada" });

      profile.skills[skillIndex] = { ...profile.skills[skillIndex], ...req.body };
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteSkillFromProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.skills = profile.skills.filter(skill => skill._id.toString() !== req.params.skillId);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ---------------------- IDIOMAS ----------------------
  addLanguageToProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.languages.push(req.body);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateLanguageInProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      const langIndex = profile.languages.findIndex(lang => lang._id.toString() === req.params.langId);
      if (langIndex === -1) return res.status(404).json({ error: "Idioma no encontrado" });

      profile.languages[langIndex] = { ...profile.languages[langIndex], ...req.body };
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteLanguageFromProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.languages = profile.languages.filter(lang => lang._id.toString() !== req.params.langId);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ---------------------- REFERENCIAS ----------------------
  addReferenceToProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.references.push(req.body);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateReferenceInProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      const refIndex = profile.references.findIndex(ref => ref._id.toString() === req.params.refId);
      if (refIndex === -1) return res.status(404).json({ error: "Referencia no encontrada" });

      profile.references[refIndex] = { ...profile.references[refIndex], ...req.body };
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteReferenceFromProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.references = profile.references.filter(ref => ref._id.toString() !== req.params.refId);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ---------------------- REDES SOCIALES ----------------------
  getSocialsFromProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });
      res.json(profile.socials);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addSocialsToProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.socials = { ...profile.socials, ...req.body };
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateSocialsInProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.socials = { ...profile.socials, ...req.body };
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteSocialFromProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      const { socialType } = req.params;
      if (profile.socials[socialType]) {
        delete profile.socials[socialType];
        await profile.save();
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ---------------------- TUTORIAL ----------------------
  markTutorialAsSeen: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

      profile.tutorialSeen = true;
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ---------------------- GUARDAR PORTAFOLIO COMPLETO ----------------------
  createFullPortfolio: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const {
        personalInfo,
        education,
        workExperience,
        projects,
        skills,
        languages,
        references,
        contact
      } = req.body;

      const newProfile = new Profile({
        ...personalInfo,
        education,
        experience: workExperience,
        projects,
        skills,
        languages,
        references,
        socials: contact
      });

      const saved = await newProfile.save();
      res.status(201).json(saved);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = profileController;