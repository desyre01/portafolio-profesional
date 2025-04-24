import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Nombre de la habilidad es requerido"),
  level: yup.number().min(1).max(5).required("Nivel es requerido"),
  category: yup.string().required("Categoría es requerida"),
});

const SkillsForm = ({ initialData = [], onNext }) => {
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const [skills, setSkills] = useState(initialData || []);

  useEffect(() => {
    if (initialData.length > 0) {
      setSkills(initialData);
    }

    // Configura función global para avanzar al siguiente paso validando
    window.handleSkillsNext = async () => {
      const isValid = await trigger();
      if (!isValid) return;

      const newSkill = getValues();
      const updated = [...skills, newSkill];
      setSkills(updated);
      onNext(updated);
    };
  }, [initialData, trigger, getValues, onNext, skills]);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Habilidades</h2>

      <form className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            {...register("name")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            {...register("category")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Selecciona una categoría</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Soft Skills">Soft Skills</option>
          </select>
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nivel (1-5)</label>
          <input
            type="number"
            {...register("level")}
            min={1}
            max={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.level && (
            <p className="text-sm text-red-600">{errors.level.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SkillsForm;
