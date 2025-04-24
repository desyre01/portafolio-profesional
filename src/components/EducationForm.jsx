import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  institution: yup.string().required('La institución es requerida'),
  degree: yup.string().required('El grado/título es requerido'),
  startDate: yup.date().required('La fecha de inicio es requerida'),
  endDate: yup.date().required('La fecha de fin es requerida'),
  description: yup.string().optional()
});

const EducationForm = ({ initialData = [], onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData[0] || {}
  });

  useEffect(() => {
    if (initialData.length > 0) {
      reset(initialData[0]);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    onSave([data]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Educación</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Institución</label>
          <input
            type="text"
            {...register("institution")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.institution && <p className="text-sm text-red-600">{errors.institution.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Grado/Título</label>
          <input
            type="text"
            {...register("degree")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.degree && <p className="text-sm text-red-600">{errors.degree.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
          <input
            type="date"
            {...register("startDate")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.startDate && <p className="text-sm text-red-600">{errors.startDate.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
          <input
            type="date"
            {...register("endDate")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.endDate && <p className="text-sm text-red-600">{errors.endDate.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            {...register("description")}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;