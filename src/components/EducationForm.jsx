import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const schema = yup.object().shape({
  institution: yup.string().required("Institución es requerida"),
  degree: yup.string().required("Grado es requerido"),
  startDate: yup.string().required("Fecha de inicio es requerida"),
  endDate: yup.string().required("Fecha de fin es requerida"),
  description: yup.string(),
});

const EducationForm = ({ profileId, onNext }) => {
  const [entries, setEntries] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleCancel = () => {
    setEditMode(false);
    setEditingId(null);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      const url = `http://localhost:5000/api/profile/${profileId}/education${editMode ? `/${editingId}` : ''}`;
      const method = editMode ? 'put' : 'post';
      
      const res = await axios[method](url, data);

      if (res.data && Array.isArray(res.data.education)) {
        setEntries(res.data.education);
        reset();
        setEditMode(false);
        setEditingId(null);
        
        // Si hay onNext y no estamos en modo edición, avanzamos al siguiente paso
        if (onNext && !editMode) {
          onNext();
        }
      } else {
        throw new Error("Formato de respuesta inválido");
      }
    } catch (error) {
      console.error("❌ Error al guardar educación:", error);
      setError(error.response?.data?.error || "Error al guardar. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // ... existing code ...

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Educación" : "Agregar Educación"}
      </h2>

      {/* ... existing code ... */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        {/* ... existing code ... */}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
          >
            {isLoading ? "Guardando..." : editMode ? "Guardar Cambios" : "Siguiente"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* ... existing code ... */}
    </div>
  );
};

export default EducationForm;