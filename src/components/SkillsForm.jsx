import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const profileId = "67f2005a56202f2256f17212";

const schema = yup.object().shape({
  name: yup.string().required("Nombre de la habilidad es requerido"),
  level: yup.number().min(1).max(5).required("Nivel es requerido"),
  category: yup.string().required("Categoría es requerida"),
});

const SkillsForm = () => {
  const [skills, setSkills] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
      setSkills(res.data.skills || []);
    } catch (err) {
      console.error("❌ Error al cargar habilidades:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

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
      }
      reset();
    } catch (error) {
      console.error("❌ Error al guardar habilidad:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/profile/${profileId}/skills/${id}`);
      setSkills(res.data.skills);
    } catch (error) {
      console.error("❌ Error al eliminar habilidad:", error);
    }
  };

  const handleEdit = (skill) => {
    setEditMode(true);
    setEditingId(skill._id);
    setValue("name", skill.name);
    setValue("level", skill.level);
    setValue("category", skill.category);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Habilidad" : "Agregar Habilidad"}
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

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editMode ? "Guardar Cambios" : "Agregar Habilidad"}
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Habilidades registradas:</h3>
        {skills.length === 0 ? (
          <p className="text-gray-500">No hay habilidades aún.</p>
        ) : (
          <ul className="space-y-4">
            {skills.map((skill) => (
              <li key={skill._id} className="border p-4 rounded bg-gray-50 shadow-sm relative">
                <p><strong>{skill.name}</strong> ({skill.category})</p>
                <p>Nivel: {"⭐".repeat(skill.level)}</p>
                <div className="absolute top-2 right-2 flex gap-3">
                  <button onClick={() => handleEdit(skill)} className="text-yellow-600 hover:text-yellow-800"><FaEdit /></button>
                  <button onClick={() => handleDelete(skill._id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;

