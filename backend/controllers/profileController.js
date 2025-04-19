const { validationResult } = require("express-validator");
const Profile = require("../models/Profile");

// ---------------------- PERFIL ----------------------
exports.createProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newProfile = new Profile(req.body);
    const saved = await newProfile.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Perfil no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const deleted = await Profile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Perfil no encontrado" });
    res.json({ message: "Perfil eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ---------------------- EDUCACIÓN ----------------------
exports.addEducationToProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    profile.education.push(req.body);
    await profile.save();
    res.json({ message: "Educación agregada", education: profile.education });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEducationInProfile = async (req, res) => {
  const { id, eduId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    const edu = profile.education.id(eduId);
    if (!edu) return res.status(404).json({ error: "Educación no encontrada" });

    Object.assign(edu, req.body);
    await profile.save();
    res.json({ message: "Educación actualizada", education: profile.education });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEducationFromProfile = async (req, res) => {
  const { id, eduId } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Replace remove() with pull()
    profile.education.pull(eduId);
    await profile.save();
    
    res.json({ message: "Educación eliminada", education: profile.education });
  } catch (error) {
    console.error("Delete Education Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ---------------------- EXPERIENCIA ----------------------
exports.addExperienceToProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    profile.experience.push(req.body);
    await profile.save();
    res.json({ message: "Experiencia agregada", experience: profile.experience });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExperienceInProfile = async (req, res) => {
  const { id, expId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    const exp = profile.experience.id(expId);
    if (!exp) return res.status(404).json({ error: "Experiencia no encontrada" });

    Object.assign(exp, req.body);
    await profile.save();
    res.json({ message: "Experiencia actualizada", experience: profile.experience });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExperienceFromProfile = async (req, res) => {
  const { id, expId } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Replace remove() with pull()
    profile.experience.pull(expId);
    await profile.save();
    
    res.json({ message: "Experiencia eliminada", experience: profile.experience });
  } catch (error) {
    console.error("Delete Experience Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ---------------------- PROYECTOS ----------------------
exports.addProjectToProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    profile.projects.push(req.body);
    await profile.save();
    res.json({ message: "Proyecto agregado", projects: profile.projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProjectInProfile = async (req, res) => {
  const { id, projectId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    const proj = profile.projects.id(projectId);
    if (!proj) return res.status(404).json({ error: "Proyecto no encontrado" });

    Object.assign(proj, req.body);
    await profile.save();
    res.json({ message: "Proyecto actualizado", projects: profile.projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProjectFromProfile = async (req, res) => {
  const { id, projectId } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Using pull() instead of remove()
    profile.projects.pull(projectId);
    await profile.save();
    
    res.json({ message: "Proyecto eliminado", projects: profile.projects });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ---------------------- HABILIDADES ----------------------
exports.addSkillToProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    const { name, category, level } = req.body;
    profile.skills.push({ name, category, level });
    await profile.save();
    res.json({ message: "Habilidad agregada", skills: profile.skills });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSkillInProfile = async (req, res) => {
  const { id, skillId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    const skill = profile.skills.id(skillId);
    if (!skill) return res.status(404).json({ error: "Habilidad no encontrada" });

    Object.assign(skill, req.body);
    await profile.save();
    res.json({ message: "Habilidad actualizada", skills: profile.skills });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Skills delete operation
exports.deleteSkillFromProfile = async (req, res) => {
  const { id, skillId } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Replace remove() with pull()
    profile.skills.pull(skillId);
    await profile.save();
    
    res.json({ message: "Habilidad eliminada", skills: profile.skills });
  } catch (error) {
    console.error("Delete Skill Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update Languages delete operation
exports.deleteLanguageFromProfile = async (req, res) => {
  const { id, langId } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Replace remove() with pull()
    profile.languages.pull(langId);
    await profile.save();
    
    res.json({ message: "Idioma eliminado", languages: profile.languages });
  } catch (error) {
    console.error("Delete Language Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update References delete operation
exports.deleteReferenceFromProfile = async (req, res) => {
  const { id, refId } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Replace remove() with pull()
    profile.references.pull(refId);
    await profile.save();
    
    res.json({ message: "Referencia eliminada", references: profile.references });
  } catch (error) {
    console.error("Delete Reference Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ---------------------- IDIOMAS ----------------------
exports.addLanguageToProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    profile.languages.push(req.body);
    await profile.save();
    res.json({ message: "Idioma agregado", languages: profile.languages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLanguageInProfile = async (req, res) => {
  const { id, langId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    const lang = profile.languages.id(langId);
    if (!lang) return res.status(404).json({ error: "Idioma no encontrado" });

    Object.assign(lang, req.body);
    await profile.save();
    res.json({ message: "Idioma actualizado", languages: profile.languages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLanguageFromProfile = async (req, res) => {
  const { id, langId } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Replace remove() with pull()
    profile.languages.pull(langId);
    await profile.save();
    
    res.json({ message: "Idioma eliminado", languages: profile.languages });
  } catch (error) {
    console.error("Delete Language Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ---------------------- REFERENCIAS ----------------------
exports.addReferenceToProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    profile.references.push(req.body);
    await profile.save();
    res.json({ message: "Referencia agregada", references: profile.references });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReferenceInProfile = async (req, res) => {
  const { id, refId } = req.params;
  const errors = validationResult(req);
  
  // Add detailed logging
  console.log('Request Body:', req.body);
  
  if (!errors.isEmpty()) {
    console.log('Validation Errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    const ref = profile.references.id(refId);
    if (!ref) return res.status(404).json({ error: "Referencia no encontrada" });

    Object.assign(ref, req.body);
    await profile.save();
    res.json({ message: "Referencia actualizada", references: profile.references });
  } catch (error) {
    console.error("Update Reference Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReferenceFromProfile = async (req, res) => {
  const { id, refId } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Replace remove() with pull()
    profile.references.pull(refId);
    await profile.save();
    
    res.json({ message: "Referencia eliminada", references: profile.references });
  } catch (error) {
    console.error("Delete Reference Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ---------------------- CONTACTO ----------------------
exports.addSocialsToProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Initialize socials if it doesn't exist
    if (!profile.socials) {
      profile.socials = {};
    }

    // Add new social media links
    const { linkedin, github, twitter, portfolio } = req.body;
    profile.socials = {
      ...profile.socials,
      linkedin: linkedin || '',
      github: github || '',
      twitter: twitter || '',
      portfolio: portfolio || ''
    };

    await profile.save();
    res.json({ message: "Redes sociales agregadas", socials: profile.socials });
  } catch (error) {
    console.error("Add Socials Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getSocialsFromProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }
    
    const socials = {
      linkedin: profile.socials?.linkedin || "",
      github: profile.socials?.github || "",
      twitter: profile.socials?.twitter || "",
      portfolio: profile.socials?.portfolio || ""
    };
    
    res.json(socials);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener redes sociales", error: error.message });
  }
};


exports.updateSocialsInProfile = async (req, res) => {
  const { id } = req.params;
  const { linkedin, github, twitter, portfolio } = req.body;

  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    profile.socials = { linkedin, github, twitter, portfolio };
    await profile.save();

    res.json({ message: "Redes sociales actualizadas", socials: profile.socials });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSocialFromProfile = async (req, res) => {
  const { id, socialType } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Validate social type
    if (!['linkedin', 'github', 'twitter', 'portfolio'].includes(socialType)) {
      return res.status(400).json({ error: "Tipo de red social no válido" });
    }

    // Set the specific social field to empty string
    profile.socials[socialType] = '';
    await profile.save();
    
    res.json({ message: "Red social eliminada", socials: profile.socials });
  } catch (error) {
    console.error("Delete Social Error:", error);
    res.status(500).json({ error: error.message });
  }
};


// ---------------------- TUTORIAL ----------------------
exports.markTutorialAsSeen = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    profile.hasSeenTutorial = true;
    await profile.save();

    res.json({ message: "Tutorial marcado como completado", hasSeenTutorial: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;