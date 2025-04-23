import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const [skills, setSkills] = useState(initialData || []);
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (initialData.length > 0) {
      setSkills(initialData);
    }
  }, [initialData]);

  const onSubmit = (data) => {
    let updatedSkills = [...skills];
    if (editMode) {
      updatedSkills[editingIndex] = data;
    } else {
      updatedSkills.push(data);
    }
    setSkills(updatedSkills);
    reset();
    setEditMode(false);
    setEditingIndex(null);
  };

  const handleNext = () => {
    onNext(skills);
  };

  const handleEdit = (index) => {
    const skill = skills[index];
    setValue("name", skill.name);
    setValue("category", skill.category);
    setValue("level", skill.level);
    setEditMode(true);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Habilidades</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            {...register("name")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
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
          {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
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
          {errors.level && <p className="text-sm text-red-600">{errors.level.message}</p>}
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

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Habilidades Agregadas:</h3>
        {skills.length === 0 ? (
          <p className="text-gray-500">No hay habilidades aún.</p>
        ) : (
          <ul className="space-y-3">
            {skills.map((skill, index) => (
              <li key={index} className="border p-3 rounded bg-gray-50 shadow-sm flex justify-between">
                <div>
                  <p><strong>{skill.name}</strong> ({skill.category})</p>
                  <p className="text-sm text-gray-600">Nivel: {skill.level}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(index)} className="text-yellow-600 hover:text-yellow-800">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
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

export default SkillsForm;
