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

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{steps[currentStep]}</h2>

      {currentStep === 0 && <PersonalInfoForm />}
      {currentStep === 1 && <EducationForm />}
      {currentStep === 2 && <WorkExperienceForm />}
      {currentStep === 3 && <ProjectForm />}
      {currentStep === 4 && <SkillsForm />}
      {currentStep === 5 && <LanguagesForm />}
      {currentStep === 6 && <ReferencesForm />}
      {currentStep === 7 && <ContactForm />}

      <div className="mt-4 flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Anterior
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setCurrentStep(Math.min(7, currentStep + 1))}
          disabled={currentStep === 7}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UnifiedPortfolioForm;
