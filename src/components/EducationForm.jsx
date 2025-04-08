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
        setEntries(res.data.education || []);
      } catch (err) {
        console.error("❌ Error al obtener perfil:", err);
      }
    };
    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    console.log("📤 Enviando datos:", data);

    try {
      let res;

      if (editMode) {
        res = await axios.put(
          `http://localhost:5000/api/profile/${profileId}/education/${editingId}`,
          data
        );
      } else {
        res = await axios.post(
          `http://localhost:5000/api/profile/${profileId}/education`,
          data
        );
      }

      if (res.data.education) {
        setEntries(res.data.education);
      }

      reset();
      setEditMode(false);
      setEditingId(null);
    } catch (error) {
      console.error("❌ Error al guardar educación:", error.response?.data || error.message);
      alert("Error al guardar educación. Revisa la consola para más detalles.");
    }
  };

  const handleDelete = async (eduId) => {
    const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar esta entrada?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/profile/${profileId}/education/${eduId}`
      );
      setEntries(res.data.education);
    } catch (error) {
      console.error("❌ Error al eliminar:", error.response?.data || error.message);
      alert("Error al eliminar. Revisa la consola.");
    }
  };

  const handleEdit = (entry) => {
    setEditMode(true);
    setEditingId(entry._id);
    setValue("institution", entry.institution);
    setValue("degree", entry.degree);
    setValue("startDate", entry.startDate);
    setValue("endDate", entry.endDate);
    setValue("description", entry.description);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Educación" : "Agregar Educación"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block">Institución</label>
          <input {...register("institution")} className="border p-2 w-full rounded" />
          <p className="text-red-500 text-sm">{errors.institution?.message}</p>
        </div>

        <div>
          <label className="block">Grado/Título</label>
          <input {...register("degree")} className="border p-2 w-full rounded" />
          <p className="text-red-500 text-sm">{errors.degree?.message}</p>
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
          {editMode ? "Guardar Cambios" : "Agregar Educación"}
        </button>
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
                <p><strong>Descripción:</strong> {entry.description}</p>

                <div className="absolute top-2 right-2 flex gap-3">
                  <button onClick={() => handleEdit(entry)} className="text-yellow-600 hover:text-yellow-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(entry._id)} className="text-red-600 hover:text-red-800">
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
