import React, { useState } from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import WorkExperienceForm from "./WorkExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import LanguagesForm from "./LanguagesForm";
import ReferencesForm from "./ReferencesForm"; 
import ContactForm from "./ContactForm";

const profileId = "67f2005a56202f2256f17212";

const FullPortfolioForm = () => {
  const [profileId, setProfileId] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8; // Total de formularios

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1:
        return <PersonalInfoForm onProfileCreated={setProfileId} onNext={() => setCurrentStep(2)} />;
      case 2:
        return <EducationForm profileId={profileId} onNext={() => setCurrentStep(3)} />;
      case 3:
        return <WorkExperienceForm profileId={profileId} onNext={() => setCurrentStep(4)} />;
      case 4:
        return <ProjectForm profileId={profileId} onNext={() => setCurrentStep(5)} />;
      case 5:
        return <SkillsForm profileId={profileId} onNext={() => setCurrentStep(6)} />;
      case 6:
        return <LanguagesForm profileId={profileId} onNext={() => setCurrentStep(7)} />;
      case 7:
        return <ReferencesForm profileId={profileId} onNext={() => setCurrentStep(8)} />;
      case 8:
        return <ContactForm profileId={profileId} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-10">
      <h2 className="text-3xl font-bold text-center text-blue-700">Crear Portafolio Profesional</h2>
      
      {renderCurrentStep()}
      
      {currentStep === totalSteps && profileId && (
        <button
          onClick={() => window.location.href = `/portfolio/${profileId}`}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors mt-8"
        >
          Crear Perfil
        </button>
      )}
    </div>
  );
};

export default FullPortfolioForm;