import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  relationship: yup.string().required("La relación es requerida"),
  testimony: yup.string().required("El testimonio es requerido"),
  imageURL: yup.string().url("Debe ser un enlace válido").nullable(),
});

const ReferencesForm = ({ initialData = [], onNext }) => {
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [references, setReferences] = useState(initialData || []);

  useEffect(() => {
    if (initialData.length > 0) {
      setReferences(initialData);
    }

    window.handleReferencesNext = async () => {
      const isValid = await trigger();
      if (!isValid) return;

      const newReference = getValues();
      const updated = [...references, newReference];
      setReferences(updated);
      onNext(updated);
    };
  }, [initialData, trigger, getValues, onNext, references]);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Referencias</h2>

      <form className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            {...register("name")}
            placeholder="Nombre completo"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Relación</label>
          <input
            {...register("relationship")}
            placeholder="Ej: colega, cliente..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.relationship && <p className="text-sm text-red-600">{errors.relationship.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Testimonio</label>
          <textarea
            {...register("testimony")}
            placeholder="Escribe el testimonio aquí"
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.testimony && <p className="text-sm text-red-600">{errors.testimony.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL de imagen (opcional)</label>
          <input
            {...register("imageURL")}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.imageURL && <p className="text-sm text-red-600">{errors.imageURL.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default ReferencesForm;
