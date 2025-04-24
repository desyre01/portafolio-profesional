import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  company: yup.string().required('La empresa es requerida'),
  position: yup.string().required('El cargo es requerido'),
  startDate: yup.date().required('La fecha de inicio es requerida'),
  endDate: yup.date().required('La fecha de fin es requerida'),
  description: yup.string().optional()
});

const WorkExperienceForm = ({ initialData = [], onNext }) => {
  const {
    register,
    trigger,
    getValues,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (initialData.length > 0) {
      reset(initialData[0]); // precargar datos si hay
    }
  }, [initialData, reset]);

  useEffect(() => {
    const handleExternalNext = async () => {
      const isValid = await trigger();
      if (isValid) {
        const values = getValues();
        onNext([values]); // se pasa como array
      }
    };

    window.handleWorkExperienceNext = handleExternalNext;
  }, [trigger, getValues, onNext]);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Experiencia Laboral</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Empresa</label>
          <input
            type="text"
            {...register("company")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.company && <p className="text-sm text-red-600">{errors.company.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cargo</label>
          <input
            type="text"
            {...register("position")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.position && <p className="text-sm text-red-600">{errors.position.message}</p>}
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
      </div>
    </div>
  );
};

export default WorkExperienceForm;
