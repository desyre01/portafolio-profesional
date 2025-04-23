import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Nombre del proyecto es requerido"),
  description: yup.string().required("Descripción es requerida"),
  technologies: yup.string().required("Tecnologías usadas es requerido"),
  link: yup.string().url("Debe ser un enlace válido").nullable(),
});

const ProjectForm = ({ initialData = [], onNext }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (initialData.length > 0) {
      reset(initialData[0]); // Carga el primer proyecto si hay uno
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    onNext([data]); // se pasa como array con un proyecto
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Proyecto</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Proyecto</label>
          <input
            {...register("name")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            {...register("description")}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tecnologías Usadas</label>
          <input
            {...register("technologies")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.technologies && <p className="text-red-600 text-sm">{errors.technologies.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Enlace (opcional)</label>
          <input
            {...register("link")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.link && <p className="text-red-600 text-sm">{errors.link.message}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
