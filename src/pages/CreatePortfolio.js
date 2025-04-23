import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePortfolio = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/profile", formData);
      const newProfileId = res.data._id;
      navigate(`/profile/${newProfileId}`);
    } catch (err) {
      console.error("❌ Error al guardar perfil:", err);
      alert("Ocurrió un error al guardar el portafolio.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre completo"
            className="input-field"
          />
        );
      case 2:
        return (
          <input
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Profesión o título"
            className="input-field"
          />
        );
      case 3:
        return (
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="input-field"
            type="email"
          />
        );
      case 4:
        return (
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            className="input-field"
          />
        );
      case 5:
        return (
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ubicación"
            className="input-field"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Crear tu Portafolio</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-6">{renderStep()}</div>

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Anterior
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {currentStep === 5 ? "Crear perfil" : "Siguiente"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePortfolio;
