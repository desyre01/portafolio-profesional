import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validaciones de campos
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched" // ✅ Mejor UX: muestra errores cuando tocan el input
  });

  // Cuando inicializa o cambia initialData
  useEffect(() => {
    if (initialData) {
      reset(initialData); // ✅ Precarga valores si hay
    }
  }, [initialData, reset]);

  // Qué pasa al enviar el formulario
  const onSubmit = (data) => {
    onNext(data); // ✅ Manda los datos al padre (UnifiedPortfolioForm)
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Información Personal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Nombre</label>
          <input
            {...register("name")}
            placeholder="Tu nombre completo"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Profesión */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Profesión</label>
          <input
            {...register("profession")}
            placeholder="Tu profesión o título"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.profession && <p className="text-sm text-red-600">{errors.profession.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="tu@email.com"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Teléfono</label>
          <input
            {...register("phone")}
            placeholder="+504 XXX XXX XXX"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Ubicación</label>
          <input
            {...register("location")}
            placeholder="Ciudad, País"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
        </div>

        {/* Botón de Siguiente */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded-lg transition disabled:opacity-60"
          >
            {isSubmitting ? "Guardando..." : "Siguiente"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
