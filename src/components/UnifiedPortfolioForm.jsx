import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import WorkExperienceForm from "./WorkExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import LanguagesForm from "./LanguagesForm";
import ReferencesForm from "./ReferencesForm";
import ContactForm from "./ContactForm";

const UnifiedPortfolioForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    email: "",
    phone: "",
    location: "",
    education: [],
    workExperience: [],
    projects: [],
    skills: [],
    languages: [],
    references: [],
    socials: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    "Información Personal",
    "Educación",
    "Experiencia Laboral",
    "Proyectos",
    "Habilidades",
    "Idiomas",
    "Referencias",
    "Contacto"
  ];

  const handleFormData = (data) => {
    if (currentStep === 0) {
      setFormData(prev => ({
        ...prev,
        name: data.name,
        profession: data.profession,
        email: data.email,
        phone: data.phone,
        location: data.location
      }));
    } else if (currentStep === 7) {
      setFormData(prev => ({
        ...prev,
        socials: data
      }));
    } else {
      const sectionMap = [
        null, "education", "workExperience", "projects",
        "skills", "languages", "references"
      ];
      const section = sectionMap[currentStep];
      if (section) {
        setFormData(prev => ({
          ...prev,
          [section]: data
        }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await axios.post("http://localhost:5000/api/profile/full", formData);
      alert("✅ Portafolio guardado exitosamente!");
      navigate(`/profile/${res.data._id}`);
    } catch (error) {
      console.error("Error al guardar:", error.response?.data || error.message);
      alert("Error al guardar el portafolio.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">{steps[currentStep]}</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${((currentStep + 1) / 8) * 100}%` }}
          ></div>
        </div>
      </div>

      {currentStep === 0 && <PersonalInfoForm initialData={formData} onNext={(data) => { handleFormData(data); setCurrentStep(1); }} />}
      {currentStep === 1 && <EducationForm initialData={formData.education} onNext={(data) => { handleFormData(data); setCurrentStep(2); }} />}
      {currentStep === 2 && <WorkExperienceForm initialData={formData.workExperience} onNext={(data) => { handleFormData(data); setCurrentStep(3); }} />}
      {currentStep === 3 && <ProjectForm initialData={formData.projects} onNext={(data) => { handleFormData(data); setCurrentStep(4); }} />}
      {currentStep === 4 && <SkillsForm initialData={formData.skills} onNext={(data) => { handleFormData(data); setCurrentStep(5); }} />}
      {currentStep === 5 && <LanguagesForm initialData={formData.languages} onNext={(data) => { handleFormData(data); setCurrentStep(6); }} />}
      {currentStep === 6 && <ReferencesForm initialData={formData.references} onNext={(data) => { handleFormData(data); setCurrentStep(7); }} />}
      {currentStep === 7 && <ContactForm initialData={formData.socials} onNext={(data) => { handleFormData(data); handleSubmit(); }} />}
    </div>
  );
};

export default UnifiedPortfolioForm;