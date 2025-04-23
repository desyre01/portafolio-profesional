import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const schema = yup.object().shape({
  company: yup.string().required("Empresa requerida"),
  position: yup.string().required("Cargo requerido"),
  startDate: yup.string().required("Inicio requerido"),
  endDate: yup.string().required("Fin requerido"),
  description: yup.string(),
});

const ExperienceForm = ({ profileId, onNext }) => {
  const [experiences, setExperiences] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // ... existing code ...

  const onSubmit = async (data) => {
    try {
      if (editMode) {
        const res = await axios.put(
          `http://localhost:5000/api/profile/${profileId}/experience/${editingId}`,
          data
        );
        setExperiences(res.data.experience);
        setEditMode(false);
        setEditingId(null);
      } else {
        const res = await axios.post(
          `http://localhost:5000/api/profile/${profileId}/experience`,
          data
        );
        setExperiences(res.data.experience);
        if (onNext) {
          onNext();
        }
      }
      reset();
    } catch (error) {
      console.error("❌ Error al guardar experiencia:", error.response?.data || error.message);
    }
  };

  // ... existing code ...

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Experiencia" : "Experiencia Laboral"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        {/* ... existing code ... */}

        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editMode ? "Guardar Cambios" : "Siguiente"}
        </button>
      </form>

      {/* ... existing code ... */}
    </div>
  );
};

export default ExperienceForm;