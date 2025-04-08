import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const profileId = "67f2005a56202f2256f17212";

const schema = yup.object().shape({
  company: yup.string().required("Empresa requerida"),
  position: yup.string().required("Cargo requerido"),
  startDate: yup.string().required("Inicio requerido"),
  endDate: yup.string().required("Fin requerido"),
  description: yup.string(),
});

const ExperienceForm = () => {
  const [experiences, setExperiences] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
        const sorted = (res.data.experience || []).sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setExperiences(sorted);
      } catch (err) {
        console.error("❌ Error al obtener perfil:", err);
      }
    };
    fetchProfile();
  }, []);

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
      }
      reset();
    } catch (error) {
      console.error("❌ Error al guardar experiencia:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (expId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/profile/${profileId}/experience/${expId}`
      );
      setExperiences(res.data.experience);
    } catch (error) {
      console.error("❌ Error al eliminar experiencia:", error);
    }
  };

  const handleEdit = (exp) => {
    setEditMode(true);
    setEditingId(exp._id);
    setValue("company", exp.company);
    setValue("position", exp.position);
    setValue("startDate", exp.startDate);
    setValue("endDate", exp.endDate);
    setValue("description", exp.description);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Experiencia" : "Agregar Experiencia Laboral"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block">Empresa</label>
          <input {...register("company")} className="border p-2 w-full rounded" />
          <p className="text-red-500 text-sm">{errors.company?.message}</p>
        </div>

        <div>
          <label className="block">Cargo</label>
          <input {...register("position")} className="border p-2 w-full rounded" />
          <p className="text-red-500 text-sm">{errors.position?.message}</p>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block">Inicio</label>
            <input type="date" {...register("startDate")} className="border p-2 w-full rounded" />
            <p className="text-red-500 text-sm">{errors.startDate?.message}</p>
          </div>
          <div className="w-1/2">
            <label className="block">Fin</label>
            <input type="date" {...register("endDate")} className="border p-2 w-full rounded" />
            <p className="text-red-500 text-sm">{errors.endDate?.message}</p>
          </div>
        </div>

        <div>
          <label className="block">Descripción</label>
          <textarea {...register("description")} className="border p-2 w-full rounded" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editMode ? "Guardar Cambios" : "Agregar Experiencia"}
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Experiencias:</h3>
        {experiences.length === 0 ? (
          <p className="text-gray-500">No hay registros aún.</p>
        ) : (
          <ul className="space-y-4">
            {experiences.map((exp) => (
              <li key={exp._id} className="border p-4 rounded bg-gray-50 shadow-sm relative">
                <p><strong>Empresa:</strong> {exp.company}</p>
                <p><strong>Cargo:</strong> {exp.position}</p>
                <p><strong>Fechas:</strong> {exp.startDate} - {exp.endDate}</p>
                <p><strong>Descripción:</strong> {exp.description}</p>

                <div className="absolute top-2 right-2 flex gap-3">
                  <button onClick={() => handleEdit(exp)} className="text-yellow-600 hover:text-yellow-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(exp._id)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
