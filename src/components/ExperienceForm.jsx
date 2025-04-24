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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
        if (res.data.experience) {
          setExperiences(res.data.experience);
        }
      } catch (error) {
        console.error("❌ Error al cargar experiencias:", error.response?.data || error.message);
      }
    };
    fetchExperiences();
  }, [profileId]);

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

  const handleEdit = (experience) => {
    setEditMode(true);
    setEditingId(experience._id);
    setValue("company", experience.company);
    setValue("position", experience.position);
    setValue("startDate", experience.startDate);
    setValue("endDate", experience.endDate);
    setValue("description", experience.description);
  };

  const handleDelete = async (experienceId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/profile/${profileId}/experience/${experienceId}`
      );
      setExperiences(res.data.experience);
    } catch (error) {
      console.error("❌ Error al eliminar experiencia:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Experiencia" : "Experiencia Laboral"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Empresa</label>
          <input
            type="text"
            {...register("company")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.company && (
            <span className="text-red-500 text-sm">{errors.company.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cargo</label>
          <input
            type="text"
            {...register("position")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.position && (
            <span className="text-red-500 text-sm">{errors.position.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
          <input
            type="date"
            {...register("startDate")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.startDate && (
            <span className="text-red-500 text-sm">{errors.startDate.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
          <input
            type="date"
            {...register("endDate")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.endDate && (
            <span className="text-red-500 text-sm">{errors.endDate.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="4"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editMode ? "Guardar Cambios" : "Siguiente"}
        </button>
      </form>

      <div className="space-y-4">
        {experiences.map((experience) => (
          <div
            key={experience._id}
            className="bg-gray-50 p-4 rounded-lg flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold">{experience.company}</h3>
              <p className="text-gray-600">{experience.position}</p>
              <p className="text-sm text-gray-500">
                {new Date(experience.startDate).toLocaleDateString()} -{" "}
                {new Date(experience.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm mt-2">{experience.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(experience)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(experience._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;