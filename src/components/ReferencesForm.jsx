import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTrash, FaEdit, FaQuoteLeft } from "react-icons/fa";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  relationship: yup.string().required("Relación es requerida"),
  testimony: yup.string().required("Testimonio es requerido"),
  imageURL: yup.string().url("Debe ser un URL válido").nullable(),
});

const ReferencesForm = ({ profileId, onNext }) => {
  const [references, setReferences] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // ... existing code ...

  const onSubmit = async (data) => {
    try {
      let res;
      if (editMode) {
        res = await axios.put(
          `http://localhost:5000/api/profile/${profileId}/references/${editingId}`,
          data
        );
      } else {
        res = await axios.post(
          `http://localhost:5000/api/profile/${profileId}/references`,
          data
        );
        if (onNext) {
          onNext();
        }
      }
      setReferences(res.data.references);
      reset();
      setEditMode(false);
      setEditingId(null);
    } catch (error) {
      console.error("❌ Error al guardar referencia:", error.response?.data || error.message);
    }
  };

  // ... existing code ...

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Referencia" : "Referencias"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <input {...register("name")} placeholder="Nombre" className="w-full border p-2 rounded" />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input
          {...register("relationship")}
          placeholder="Relación (Ej: colega, cliente...)"
          className="w-full border p-2 rounded"
        />
        <p className="text-red-500 text-sm">{errors.relationship?.message}</p>

        <textarea
          {...register("testimony")}
          placeholder="Testimonio"
          className="w-full border p-2 rounded"
        />
        <p className="text-red-500 text-sm">{errors.testimony?.message}</p>

        <input
          {...register("imageURL")}
          placeholder="URL de imagen (opcional)"
          className="w-full border p-2 rounded"
        />
        <p className="text-red-500 text-sm">{errors.imageURL?.message}</p>

        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editMode ? "Guardar Cambios" : "Siguiente"}
        </button>
      </form>

      {/* ... existing code ... */}
    </div>
  );
};

export default ReferencesForm;