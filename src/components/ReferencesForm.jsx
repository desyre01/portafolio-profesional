import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTrash, FaEdit, FaQuoteLeft } from "react-icons/fa";

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  relationship: yup.string().required("Relación es requerida"),
  testimony: yup.string().required("Testimonio es requerido"),
  imageURL: yup.string().url("Debe ser un URL válido").nullable(),
});

const ReferencesForm = ({ initialData = [], onNext }) => {
  const [references, setReferences] = useState(initialData || []);
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (initialData.length > 0) {
      setReferences(initialData);
    }
  }, [initialData]);

  const onSubmit = (data) => {
    const updated = [...references];
    if (editMode && editingIndex !== null) {
      updated[editingIndex] = data;
    } else {
      updated.push(data);
    }
    setReferences(updated);
    setEditMode(false);
    setEditingIndex(null);
    reset();
  };

  const handleEdit = (index) => {
    const ref = references[index];
    setEditMode(true);
    setEditingIndex(index);
    setValue("name", ref.name);
    setValue("relationship", ref.relationship);
    setValue("testimony", ref.testimony);
    setValue("imageURL", ref.imageURL || "");
  };

  const handleDelete = (index) => {
    const updated = references.filter((_, i) => i !== index);
    setReferences(updated);
  };

  const handleNext = () => {
    if (onNext) onNext(references);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Referencias
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input 
            {...register("name")} 
            placeholder="Nombre completo"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Relación</label>
          <input 
            {...register("relationship")}
            placeholder="Ej: colega, cliente..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.relationship && (
            <p className="text-sm text-red-600">{errors.relationship.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Testimonio</label>
          <textarea
            {...register("testimony")}
            placeholder="Escribe el testimonio aquí"
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.testimony && (
            <p className="text-sm text-red-600">{errors.testimony.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL de imagen (opcional)</label>
          <input 
            {...register("imageURL")}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.imageURL && (
            <p className="text-sm text-red-600">{errors.imageURL.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
          >
            {editMode ? "Guardar Cambios" : "Agregar"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                reset();
                setEditMode(false);
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Referencias Registradas:</h3>
        {references.length === 0 ? (
          <p className="text-gray-500">No hay referencias aún.</p>
        ) : (
          <ul className="space-y-4">
            {references.map((ref, index) => (
              <li key={index} className="border p-4 rounded bg-gray-50 shadow-sm relative">
                <div className="flex items-start gap-4">
                  {ref.imageURL && (
                    <img 
                      src={ref.imageURL} 
                      alt={ref.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p><strong>Nombre:</strong> {ref.name}</p>
                    <p><strong>Relación:</strong> {ref.relationship}</p>
                    <div className="mt-2">
                      <FaQuoteLeft className="text-gray-400 mb-2" />
                      <p className="italic">{ref.testimony}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleNext}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Siguiente
      </button>
    </div>
  );
};

export default ReferencesForm;
