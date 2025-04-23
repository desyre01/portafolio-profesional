import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  profession: yup.string().required("La profesión es obligatoria"),
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  phone: yup.string().required("El teléfono es obligatorio"),
  location: yup.string().required("La ubicación es obligatoria"),
});

const PersonalInfoForm = ({ initialData, onNext }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Rellenar el formulario si hay datos previos
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    // Envía los datos hacia el componente padre sin guardar aún
    onNext(data);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Información Personal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            {...register("name")}
            placeholder="Tu nombre completo"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profesión</label>
          <input
            {...register("profession")}
            placeholder="Tu profesión o título"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.profession && <p className="text-sm text-red-600">{errors.profession.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="tu@email.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            {...register("phone")}
            placeholder="+504 XXX XXX XXX"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ubicación</label>
          <input
            {...register("location")}
            placeholder="Ciudad, País"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
