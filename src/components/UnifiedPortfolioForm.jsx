import React, { useState } from "react";
import axios from "axios";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import WorkExperienceForm from "./WorkExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import ContactForm from "./ContactForm";
import LanguagesForm from "./LanguagesForm";
import ReferencesForm from "./ReferencesForm";
import { useNavigate } from "react-router-dom";

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
    contact: {}
  });

  const steps = {
    0: 'Información Personal',
    1: 'Educación',
    2: 'Experiencia Laboral',
    3: 'Proyectos',
    4: 'Habilidades',
    5: 'Idiomas',
    6: 'Referencias',
    7: 'Contacto'
  };

  const handleFormData = (data) => {
    if (currentStep === 0) {
      setFormData(prevData => ({
        ...prevData,
        name: data.name,
        profession: data.profession,
        email: data.email,
        phone: data.phone,
        location: data.location
      }));
    } else {
      const sectionMap = {
        1: "education",
        2: "workExperience",
        3: "projects",
        4: "skills",
        5: "languages",
        6: "references",
        7: "contact"
      };
      
      const section = sectionMap[currentStep];
      if (section) {
        setFormData(prevData => ({
          ...prevData,
          [section]: data
        }));
      }
    }
  };

  const handleNext = () => {
    if (window[`handle${steps[currentStep].replace(/\s+/g, '')}Next`]) {
      window[`handle${steps[currentStep].replace(/\s+/g, '')}Next`]();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const requiredFields = ['name', 'profession', 'email', 'phone', 'location'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        alert(`Por favor, completa los siguientes campos obligatorios: ${missingFields.join(', ')}`);
        setCurrentStep(0);
        return;
      }

      const response = await axios.post("http://localhost:5000/api/profile/full", formData);
      alert("✅ ¡Portafolio guardado exitosamente!");
      const profileId = response.data._id;
      navigate(`/profile/${profileId}`);
    } catch (error) {
      console.error("❌ Error al guardar el portafolio:", error.response?.data || error.message);
      alert(`❌ Error al guardar el portafolio: ${error.response?.data?.error || 'Por favor, verifica que todos los campos obligatorios estén completos.'}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{steps[currentStep]}</h2>

      {currentStep === 0 && (
        <PersonalInfoForm
          onNext={handleFormData}
          initialData={{
            name: formData.name,
            profession: formData.profession,
            email: formData.email,
            phone: formData.phone,
            location: formData.location
          }}
        />
      )}
      {currentStep === 1 && (
        <EducationForm
          onNext={handleFormData}
          initialData={formData.education}
        />
      )}
      {currentStep === 2 && (
        <WorkExperienceForm
          onNext={handleFormData}
          initialData={formData.workExperience}
        />
      )}
      {currentStep === 3 && (
        <ProjectForm
          onNext={handleFormData}
          initialData={formData.projects}
        />
      )}
      {currentStep === 4 && (
        <SkillsForm
          onNext={handleFormData}
          initialData={formData.skills}
        />
      )}
      {currentStep === 5 && (
        <LanguagesForm
          onNext={handleFormData}
          initialData={formData.languages}
        />
      )}
      {currentStep === 6 && (
        <ReferencesForm
          onNext={handleFormData}
          initialData={formData.references}
        />
      )}
      {currentStep === 7 && (
        <ContactForm
          onNext={(data) => {
            handleFormData(data);
            handleSubmit();
          }}
          initialData={formData.contact}
        />
      )}

      <div className="mt-4 flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
        >
          Anterior
        </button>

        {currentStep === 7 ? (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            onClick={handleSubmit}
          >
            Guardar Portafolio
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={handleNext}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default UnifiedPortfolioForm;