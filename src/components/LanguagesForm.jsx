import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const schema = yup.object().shape({
  language: yup.string().required("Idioma es requerido"),
  level: yup.string().required("Nivel es requerido"),
});

const LanguagesForm = ({ profileId, onNext }) => {
  const [languages, setLanguages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // ... existing code ...

  const onSubmit = async (data) => {
    try {
      if (editMode) {
        const res = await axios.put(
          `http://localhost:5000/api/profile/${profileId}/languages/${editingId}`,
          data
        );
        setLanguages(res.data.languages);
        setEditMode(false);
        setEditingId(null);
      } else {
        const res = await axios.post(
          `http://localhost:5000/api/profile/${profileId}/languages`,
          data
        );
        setLanguages(res.data.languages);
        if (onNext) {
          onNext();
        }
      }
      reset();
    } catch (error) {
      console.error("❌ Error al guardar idioma:", error.response?.data || error.message);
    }
  };

  // ... existing code ...

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Idioma" : "Idiomas"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label>Idioma</label>
          <input {...register("language")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.language?.message}</p>
        </div>
        <div>
          <label>Nivel</label>
          <select {...register("level")} className="w-full border p-2 rounded">
            <option value="">Selecciona nivel</option>
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Nativo">Nativo</option>
          </select>
          <p className="text-red-500 text-sm">{errors.level?.message}</p>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editMode ? "Guardar Cambios" : "Siguiente"}
        </button>
      </form>

      {/* ... existing code ... */}
    </div>
  );
};

export default LanguagesForm;
