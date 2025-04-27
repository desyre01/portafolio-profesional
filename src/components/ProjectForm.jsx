import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required("El nombre del proyecto es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  technologies: yup.string().required("Las tecnologías usadas son obligatorias"),
  link: yup.string().url("Debe ser un enlace válido").nullable()
});

const ProjectForm = ({ initialData = [], onNext }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (initialData.length > 0) {
      reset(initialData[0]);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    onNext([data]); // ✅ Importante: enviarlo como arreglo
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Proyectos</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Nombre del Proyecto</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Nombre del proyecto"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Descripción</label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Descripción breve del proyecto"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Tecnologías Usadas</label>
          <input
            type="text"
            {...register("technologies")}
            placeholder="Ejemplo: React, Node.js, MongoDB"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.technologies && <p className="text-sm text-red-600">{errors.technologies.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Enlace (opcional)</label>
          <input
            type="text"
            {...register("link")}
            placeholder="https://github.com/mi-proyecto"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.link && <p className="text-sm text-red-600">{errors.link.message}</p>}
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

export default ProjectForm;
