import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre de la habilidad es obligatorio"),
  level: yup.number().min(1, "El nivel debe ser al menos 1").max(5, "El nivel máximo es 5").required("El nivel es obligatorio"),
  category: yup.string().required("La categoría es obligatoria")
});

const SkillsForm = ({ initialData = [], onNext }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) });

  const [skills, setSkills] = useState(initialData || []);

  useEffect(() => {
    if (initialData.length > 0) {
      reset(initialData[0]);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const updatedSkills = [...skills, data];
    setSkills(updatedSkills);
    onNext(updatedSkills);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Habilidades</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Nombre de la Habilidad</label>
          <input
            {...register("name")}
            placeholder="Ej: React, Liderazgo"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Categoría</label>
          <select
            {...register("category")}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          >
            <option value="">Selecciona una categoría</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Soft Skills">Soft Skills</option>
          </select>
          {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Nivel (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            {...register("level")}
            placeholder="Nivel de 1 a 5"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.level && <p className="text-sm text-red-600">{errors.level.message}</p>}
        </div>

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

export default SkillsForm;
