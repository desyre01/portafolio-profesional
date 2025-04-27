import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  company: yup.string().required('La empresa es requerida'),
  position: yup.string().required('El cargo es requerido'),
  startDate: yup.date().required('La fecha de inicio es requerida'),
  endDate: yup.date().required('La fecha de fin es requerida'),
  description: yup.string()
});

const WorkExperienceForm = ({ initialData = [], onNext }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (initialData.length > 0) {
      reset(initialData[0]);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    onNext([data]); // 🔵 Lo enviamos como array
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Experiencia Laboral</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Empresa</label>
          <input
            type="text"
            {...register("company")}
            placeholder="Nombre de la empresa"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.company && <p className="text-sm text-red-600">{errors.company.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Cargo</label>
          <input
            type="text"
            {...register("position")}
            placeholder="Cargo desempeñado"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
          {errors.position && <p className="text-sm text-red-600">{errors.position.message}</p>}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700">Fecha de Inicio</label>
            <input
              type="date"
              {...register("startDate")}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
            {errors.startDate && <p className="text-sm text-red-600">{errors.startDate.message}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700">Fecha de Fin</label>
            <input
              type="date"
              {...register("endDate")}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
            {errors.endDate && <p className="text-sm text-red-600">{errors.endDate.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Descripción (opcional)</label>
          <textarea
            {...register("description")}
            placeholder="Descripción breve de tus funciones o logros"
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          ></textarea>
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

export default WorkExperienceForm;
