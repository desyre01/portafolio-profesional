import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  relationship: yup.string().required("La relación es obligatoria"),
  testimony: yup.string().required("El testimonio es obligatorio"),
  imageURL: yup.string().url("Debe ser un enlace válido").nullable()
});

const ReferencesForm = ({ initialData = [], onNext }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) });

  const [references, setReferences] = useState(initialData || []);

  useEffect(() => {
    if (initialData.length > 0) {
      reset(initialData[0]);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const updatedReferences = [...references, data];
    setReferences(updatedReferences);
    onNext(updatedReferences);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Referencias</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Nombre</label>
          <input
            {...register("name")}
            placeholder="Nombre completo"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Relación</label>
          <input
            {...register("relationship")}
            placeholder="Ej: colega, supervisor, cliente"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.relationship && <p className="text-sm text-red-600">{errors.relationship.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Testimonio</label>
          <textarea
            {...register("testimony")}
            placeholder="Escribe el testimonio aquí"
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.testimony && <p className="text-sm text-red-600">{errors.testimony.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">URL de imagen (opcional)</label>
          <input
            {...register("imageURL")}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.imageURL && <p className="text-sm text-red-600">{errors.imageURL.message}</p>}
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

export default ReferencesForm;
