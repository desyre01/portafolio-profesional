const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: { type: String },
}, { _id: true });

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: { type: String },
}, { _id: true });

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: Number, required: true, min: 1, max: 5 },
}, { _id: true });

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  profession: {
    type: String,
    required: [true, "La profesión es obligatoria"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    match: [/\S+@\S+\.\S+/, "Formato de email inválido"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "El número de teléfono es obligatorio"],
  },
  location: {
    type: String,
    required: [true, "La ubicación es obligatoria"],
  },
  education: [educationSchema],
  experience: [experienceSchema],
  skills: [skillSchema],
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
