import React, { useState } from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import WorkExperienceForm from "./WorkExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import ContactForm from "./ContactForm";
import LanguagesForm from "./LanguagesForm";
import ReferencesForm from "./ReferencesForm";

const UnifiedPortfolioForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {},
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

  const handleFormData = (data, section) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: data
    }));
  };

  const handleSubmit = async () => {
    try {
      // Aquí puedes agregar la llamada a tu API para guardar los datos
      console.log('Datos del portafolio a guardar:', formData);
      alert('¡Portafolio guardado exitosamente!');
    } catch (error) {
      console.error('Error al guardar el portafolio:', error);
      alert('Error al guardar el portafolio. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{steps[currentStep]}</h2>

      {currentStep === 0 && (
        <PersonalInfoForm 
          onSave={(data) => handleFormData(data, 'personalInfo')}
          initialData={formData.personalInfo}
        />
      )}
      {currentStep === 1 && (
        <EducationForm 
          onSave={(data) => handleFormData(data, 'education')}
          initialData={formData.education}
        />
      )}
      {currentStep === 2 && (
        <WorkExperienceForm 
          onSave={(data) => handleFormData(data, 'workExperience')}
          initialData={formData.workExperience}
        />
      )}
      {currentStep === 3 && (
        <ProjectForm 
          onSave={(data) => handleFormData(data, 'projects')}
          initialData={formData.projects}
        />
      )}
      {currentStep === 4 && (
        <SkillsForm 
          onSave={(data) => handleFormData(data, 'skills')}
          initialData={formData.skills}
        />
      )}
      {currentStep === 5 && (
        <LanguagesForm 
          onSave={(data) => handleFormData(data, 'languages')}
          initialData={formData.languages}
        />
      )}
      {currentStep === 6 && (
        <ReferencesForm 
          onSave={(data) => handleFormData(data, 'references')}
          initialData={formData.references}
        />
      )}
      {currentStep === 7 && (
        <ContactForm 
          onSave={(data) => handleFormData(data, 'contact')}
          initialData={formData.contact}
        />
      )}

      <div className="mt-4 flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Anterior
        </button>
        {currentStep === 7 ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            onClick={handleSubmit}
          >
            Guardar Portafolio
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => setCurrentStep(Math.min(7, currentStep + 1))}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default UnifiedPortfolioForm;