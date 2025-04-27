import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  language: yup.string().required("El idioma es obligatorio"),
  level: yup.string().required("El nivel es obligatorio")
});

const LanguagesForm = ({ initialData = [], onNext }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) });

  const [languages, setLanguages] = useState(initialData || []);

  useEffect(() => {
    if (initialData.length > 0) {
      reset(initialData[0]);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const updatedLanguages = [...languages, data];
    setLanguages(updatedLanguages);
    onNext(updatedLanguages);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Idiomas</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Idioma</label>
          <input
            {...register("language")}
            placeholder="Ej: Inglés, Español, Francés"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.language && (
            <p className="text-sm text-red-600">{errors.language.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Nivel</label>
          <select
            {...register("level")}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          >
            <option value="">Selecciona un nivel</option>
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Nativo">Nativo</option>
          </select>
          {errors.level && (
            <p className="text-sm text-red-600">{errors.level.message}</p>
          )}
        </div>

        {/* Botón Siguiente */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
          >
            {isSubmitting ? "Guardando..." : "Siguiente"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LanguagesForm;
