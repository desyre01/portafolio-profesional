import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  profession: yup
    .string()
    .trim()
    .required("La profesión es obligatoria")
    .min(2, "La profesión debe tener al menos 2 caracteres"),
  email: yup
    .string()
    .trim()
    .email("Email inválido")
    .required("El email es obligatorio"),
  phone: yup
    .string()
    .trim()
    .required("El teléfono es obligatorio")
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/,
      "Formato de teléfono inválido"
    ),
  location: yup
    .string()
    .trim()
    .required("La ubicación es obligatoria")
    .min(2, "La ubicación debe tener al menos 2 caracteres"),
});

const PersonalInfoForm = ({ initialData, onNext }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: initialData || {
      name: "",
      profession: "",
      email: "",
      phone: "",
      location: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      // Limpiamos los espacios en blanco de los datos
      const cleanedData = Object.keys(data).reduce((acc, key) => {
        acc[key] = typeof data[key] === "string" ? data[key].trim() : data[key];
        return acc;
      }, {});

      console.log("Datos a enviar:", cleanedData);
      await onNext(cleanedData);
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      alert("Hubo un error al procesar el formulario. Por favor, intenta nuevamente.");
    }
  };

  // Observamos todos los campos para validación en tiempo real
  const watchAllFields = watch();

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Información Personal
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Nombre Completo *
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Ej: Juan Pérez"
            className={`mt-1 block w-full rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Profesión *
          </label>
          <input
            {...register("profession")}
            type="text"
            placeholder="Ej: Desarrollador Web"
            className={`mt-1 block w-full rounded-md border ${
              errors.profession ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
          />
          {errors.profession && (
            <p className="text-sm text-red-600 mt-1">{errors.profession.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Email *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="tu@email.com"
            className={`mt-1 block w-full rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Teléfono *
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+504 XXX-XXX-XXXX"
            className={`mt-1 block w-full rounded-md border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Ubicación *
          </label>
          <input
            {...register("location")}
            type="text"
            placeholder="Ciudad, País"
            className={`mt-1 block w-full rounded-md border ${
              errors.location ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
          />
          {errors.location && (
            <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
          )}
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting || !isDirty || Object.keys(errors).length > 0}
            className={`w-full py-3 rounded-lg transition ${
              isSubmitting || !isDirty || Object.keys(errors).length > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold`}
          >
            {isSubmitting ? "Guardando..." : "Siguiente"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;