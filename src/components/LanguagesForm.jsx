import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  language: yup.string().required("Idioma es requerido"),
  level: yup.string().required("Nivel es requerido"),
});

const LanguagesForm = ({ initialData = [], onNext }) => {
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [languages, setLanguages] = useState(initialData || []);

  useEffect(() => {
    if (initialData.length > 0) {
      setLanguages(initialData);
    }

    window.handleLanguagesNext = async () => {
      const valid = await trigger();
      if (!valid) return;

      const data = getValues();
      const updatedLanguages = [...languages, data];

      setLanguages(updatedLanguages);
      onNext(updatedLanguages);
    };
  }, [initialData, trigger, getValues, onNext, languages]);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Idiomas</h2>

      <form className="space-y-4 mb-6">
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
      </form>
    </div>
  );
};

export default LanguagesForm;
