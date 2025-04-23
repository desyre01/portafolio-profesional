import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  language: yup.string().required("Idioma es requerido"),
  level: yup.string().required("Nivel es requerido"),
});

const LanguagesForm = ({ initialData = [], onNext }) => {
  const [languages, setLanguages] = useState(initialData || []);
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (initialData.length > 0) {
      setLanguages(initialData);
    }
  }, [initialData]);

  const onSubmit = (data) => {
    let updated = [...languages];
    if (editMode) {
      updated[editingIndex] = data;
    } else {
      updated.push(data);
    }
    setLanguages(updated);
    reset();
    setEditMode(false);
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const lang = languages[index];
    setValue("language", lang.language);
    setValue("level", lang.level);
    setEditMode(true);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = languages.filter((_, i) => i !== index);
    setLanguages(updated);
  };

  const handleNext = () => {
    if (onNext) onNext(languages);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Idiomas
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Idioma</label>
          <input 
            {...register("language")} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.language && (
            <p className="text-sm text-red-600">{errors.language.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nivel</label>
          <select 
            {...register("level")} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Selecciona nivel</option>
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Nativo">Nativo</option>
          </select>
          {errors.level && (
            <p className="text-sm text-red-600">{errors.level.message}</p>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
          >
            {editMode ? "Guardar Cambios" : "Agregar"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                reset();
                setEditMode(false);
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Idiomas Agregados:</h3>
        {languages.length === 0 ? (
          <p className="text-gray-500">No hay idiomas aún.</p>
        ) : (
          <ul className="space-y-4">
            {languages.map((lang, index) => (
              <li key={index} className="border p-4 rounded bg-gray-50 shadow-sm flex justify-between">
                <div>
                  <p><strong>Idioma:</strong> {lang.language}</p>
                  <p><strong>Nivel:</strong> {lang.level}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleNext}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Siguiente
      </button>
    </div>
  );
};

export default LanguagesForm;
