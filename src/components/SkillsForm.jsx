import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Nombre de la habilidad es requerido"),
  level: yup.number().min(1).max(5).required("Nivel es requerido"),
  category: yup.string().required("Categoría es requerida"),
});

const SkillsForm = ({ profileId, onNext }) => {
  const [skills, setSkills] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      if (editMode) {
        const res = await axios.put(
          `http://localhost:5000/api/profile/${profileId}/skills/${editingId}`,
          data
        );
        setSkills(res.data.skills);
        setEditMode(false);
        setEditingId(null);
      } else {
        const res = await axios.post(
          `http://localhost:5000/api/profile/${profileId}/skills`,
          data
        );
        setSkills(res.data.skills);
        if (onNext) {
          onNext();
        }
      }
      reset();
    } catch (error) {
      console.error("❌ Error al guardar habilidad:", error.response?.data || error.message);
    }
  };

  // ... existing code ...

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Habilidad" : "Habilidades"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label>Nombre</label>
          <input {...register("name")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>
        <div>
          <label>Categoría</label>
          <select {...register("category")} className="w-full border p-2 rounded">
            <option value="">Selecciona una categoría</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Soft Skills">Soft Skills</option>
          </select>
          <p className="text-red-500 text-sm">{errors.category?.message}</p>
        </div>
        <div>
          <label>Nivel (1-5)</label>
          <input type="number" {...register("level")} min={1} max={5} className="w-full border p-2 rounded" />
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

export default SkillsForm;