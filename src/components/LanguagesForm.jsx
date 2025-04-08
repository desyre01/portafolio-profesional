import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const profileId = "67f2005a56202f2256f17212"; 

const schema = yup.object().shape({
  language: yup.string().required("Idioma es requerido"),
  level: yup.string().required("Nivel es requerido"),
});

const LanguagesForm = () => {
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

  // Obtener idiomas al montar
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
        setLanguages(res.data.languages || []);
      } catch (err) {
        console.error("❌ Error al cargar idiomas:", err);
      }
    };
    fetchLanguages();
  }, []);

  // Enviar nuevo idioma o actualizar
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
      }
      reset();
    } catch (error) {
      console.error("❌ Error al guardar idioma:", error.response?.data || error.message);
    }
  };

  const handleEdit = (lang) => {
    setEditMode(true);
    setEditingId(lang._id);
    setValue("language", lang.language);
    setValue("level", lang.level);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/profile/${profileId}/languages/${id}`
      );
      setLanguages(res.data.languages);
    } catch (error) {
      console.error("❌ Error al eliminar idioma:", error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Idioma" : "Agregar Idioma"}
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

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editMode ? "Guardar Cambios" : "Agregar Idioma"}
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Idiomas Registrados:</h3>
        {languages.length === 0 ? (
          <p className="text-gray-500">No hay idiomas aún.</p>
        ) : (
          <ul className="space-y-4">
            {languages.map((lang) => (
              <li key={lang._id} className="border p-4 rounded bg-gray-50 shadow-sm relative">
                <p><strong>Idioma:</strong> {lang.language}</p>
                <p><strong>Nivel:</strong> {lang.level}</p>

                <div className="absolute top-2 right-2 flex gap-3">
                  <button onClick={() => handleEdit(lang)} className="text-yellow-600 hover:text-yellow-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(lang._id)} className="text-red-600 hover:text-red-800">
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

export default LanguagesForm;
