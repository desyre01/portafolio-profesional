import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const profileId = "67f2005a56202f2256f17212"; 

const schema = yup.object().shape({
  institution: yup.string().required("Institución es requerida"),
  degree: yup.string().required("Grado es requerido"),
  startDate: yup.string().required("Fecha de inicio es requerida"),
  endDate: yup.string().required("Fecha de fin es requerida"),
  description: yup.string(),
});

const EducationForm = () => {
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

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
      if (res.data && Array.isArray(res.data.education)) {
        setEntries(res.data.education);
      } else {
        setEntries([]);
      }
    } catch (err) {
      console.error("❌ Error al obtener perfil:", err);
      setError("Error al cargar los datos. Por favor, intente nuevamente.");
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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

  const handleDelete = async (eduId) => {
    if (!window.confirm("¿Estás seguro que deseas eliminar esta entrada?")) return;

    try {
      setIsLoading(true);
      setError(null);

      const res = await axios.delete(
        `http://localhost:5000/api/profile/${profileId}/education/${eduId}`
      );

      if (res.data && Array.isArray(res.data.education)) {
        setEntries(res.data.education);
      } else {
        throw new Error("Formato de respuesta inválido");
      }
    } catch (error) {
      console.error("❌ Error al eliminar:", error);
      setError(error.response?.data?.error || "Error al eliminar. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (entry) => {
    setEditMode(true);
    setEditingId(entry._id);
    setValue("institution", entry.institution);
    setValue("degree", entry.degree);
    setValue("startDate", entry.startDate);
    setValue("endDate", entry.endDate);
    setValue("description", entry.description || "");
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditingId(null);
    reset();
  };

  if (isLoading) {
    return <div className="text-center py-4">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Educación" : "Agregar Educación"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block">Institución</label>
          <input
            {...register("institution")}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.institution?.message}</p>
        </div>

        <div>
          <label className="block">Grado/Título</label>
          <input
            {...register("degree")}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.degree?.message}</p>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block">Inicio</label>
            <input
              type="date"
              {...register("startDate")}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.startDate?.message}</p>
          </div>
          <div className="w-1/2">
            <label className="block">Fin</label>
            <input
              type="date"
              {...register("endDate")}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.endDate?.message}</p>
          </div>
        </div>

        <div>
          <label className="block">Descripción</label>
          <textarea
            {...register("description")}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
          >
            {isLoading ? "Guardando..." : editMode ? "Guardar Cambios" : "Agregar Educación"}
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

      <div>
        <h3 className="text-xl font-semibold mb-2">Entradas registradas:</h3>
        {entries.length === 0 ? (
          <p className="text-gray-500">No hay registros aún.</p>
        ) : (
          <ul className="space-y-4">
            {entries.map((entry) => (
              <li key={entry._id} className="border p-4 rounded bg-gray-50 shadow-sm relative">
                <p><strong>Institución:</strong> {entry.institution}</p>
                <p><strong>Grado:</strong> {entry.degree}</p>
                <p><strong>Fechas:</strong> {entry.startDate} - {entry.endDate}</p>
                {entry.description && <p><strong>Descripción:</strong> {entry.description}</p>}

                <div className="absolute top-2 right-2 flex gap-3">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="text-yellow-600 hover:text-yellow-800 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    disabled={isLoading}
                  >
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

export default EducationForm;