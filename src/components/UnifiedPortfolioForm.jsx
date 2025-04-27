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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("Guardar Portafolio");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdProfileId, setCreatedProfileId] = useState(null);

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

  const handleSubmit = async () => {
    try {
      const requiredFields = ['name', 'profession', 'email', 'phone', 'location'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        alert(`Por favor, completa los siguientes campos obligatorios: ${missingFields.join(', ')}`);
        setCurrentStep(0);
        return;
      }

      setIsSubmitting(true);
      setSubmitMessage("Guardando...");

      const response = await axios.post("http://localhost:5000/api/profile/full", formData);

      setSubmitMessage("¡Guardado exitosamente! ✅");

      setTimeout(() => {
        setCreatedProfileId(response.data._id);
        setShowSuccessModal(true);
        setIsSubmitting(false);
      }, 1000);

    } catch (error) {
      console.error("❌ Error al guardar el portafolio:", error.response?.data || error.message);
      alert(`❌ Error al guardar el portafolio: ${error.response?.data?.error || 'Por favor, verifica que todos los campos obligatorios estén completos.'}`);
      setIsSubmitting(false);
      setSubmitMessage("Guardar Portafolio");
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            onNext={(data) => {
              handleFormData(data);
              setCurrentStep(1);
            }}
            initialData={{
              name: formData.name,
              profession: formData.profession,
              email: formData.email,
              phone: formData.phone,
              location: formData.location
            }}
          />
        );
      case 1:
        return (
          <EducationForm
            onNext={(data) => {
              handleFormData(data);
              setCurrentStep(2);
            }}
            initialData={formData.education}
          />
        );
      case 2:
        return (
          <WorkExperienceForm
            onNext={(data) => {
              handleFormData(data);
              setCurrentStep(3);
            }}
            initialData={formData.workExperience}
          />
        );
      case 3:
        return (
          <ProjectForm
            onNext={(data) => {
              handleFormData(data);
              setCurrentStep(4);
            }}
            initialData={formData.projects}
          />
        );
      case 4:
        return (
          <SkillsForm
            onNext={(data) => {
              handleFormData(data);
              setCurrentStep(5);
            }}
            initialData={formData.skills}
          />
        );
      case 5:
        return (
          <LanguagesForm
            onNext={(data) => {
              handleFormData(data);
              setCurrentStep(6);
            }}
            initialData={formData.languages}
          />
        );
      case 6:
        return (
          <ReferencesForm
            onNext={(data) => {
              handleFormData(data);
              setCurrentStep(7);
            }}
            initialData={formData.references}
          />
        );
      case 7:
        return (
          <ContactForm
            onNext={(data) => {
              handleFormData(data);
              setTimeout(() => {
                handleSubmit();
              }, 100);
            }}
            initialData={formData.contact}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto p-4 bg-white rounded shadow">

      {/* Barra de Progreso */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Paso {currentStep + 1} de 8
          </span>
          <span className="text-sm font-medium text-gray-500">
            {steps[currentStep]}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / 8) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Título del Paso */}
      <h2 className="text-2xl font-bold mb-4">{steps[currentStep]}</h2>

      {/* Render del Formulario Actual */}
      {renderForm()}

      {/* Botones de Navegación */}
      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
          >
            Anterior
          </button>
        )}
      </div>

      {/* Modal de Éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-4 text-center animate-fadeSlide">
            <h2 className="text-2xl font-bold text-green-600 mb-4">✅ ¡Portafolio creado exitosamente!</h2>
            <p className="text-gray-700 mb-6">Tu portafolio ha sido guardado y ahora puedes verlo en tu perfil.</p>
            <button
              onClick={() => navigate(`/profile/${createdProfileId}`)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
            >
              Ver mi Perfil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedPortfolioForm;
