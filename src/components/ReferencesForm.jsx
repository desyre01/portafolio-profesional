import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTrash, FaEdit, FaQuoteLeft } from "react-icons/fa";
import axios from "axios";

const profileId = "67f2005a56202f2256f17212";

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  relationship: yup.string().required("Relación es requerida"),
  testimony: yup.string().required("Testimonio es requerido"),
  imageURL: yup.string().url("Debe ser un URL válido").nullable(),
});

const ReferencesForm = () => {
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

  const fetchReferences = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
      setReferences(res.data.references || []);
    } catch (error) {
      console.error("❌ Error al obtener referencias:", error);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

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
      }
      setReferences(res.data.references);
      reset();
      setEditMode(false);
      setEditingId(null);
    } catch (error) {
      console.error("❌ Error al guardar referencia:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/profile/${profileId}/references/${id}`
      );
      setReferences(res.data.references);
    } catch (error) {
      console.error("❌ Error al eliminar referencia:", error);
    }
  };

  const handleEdit = (ref) => {
    setEditMode(true);
    setEditingId(ref._id);
    setValue("name", ref.name);
    setValue("relationship", ref.relationship);
    setValue("testimony", ref.testimony);
    setValue("imageURL", ref.imageURL || "");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Referencia" : "Agregar Referencia/Testimonio"}
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

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editMode ? "Guardar Cambios" : "Agregar Testimonio"}
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Referencias:</h3>
        {references.length === 0 ? (
          <p className="text-gray-500">No hay testimonios aún.</p>
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {references.map((ref) => (
              <li key={ref._id} className="border p-4 rounded bg-gray-50 shadow-sm relative">
                <FaQuoteLeft className="text-gray-400 text-xl mb-2" />
                <p className="italic">"{ref.testimony}"</p>
                <div className="mt-2">
                  <p className="font-semibold">{ref.name}</p>
                  <p className="text-sm text-gray-600">{ref.relationship}</p>
                </div>
                {ref.imageURL && (
                  <img
                    src={ref.imageURL}
                    alt={ref.name}
                    className="w-12 h-12 rounded-full absolute top-2 right-2 object-cover"
                  />
                )}
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button onClick={() => handleEdit(ref)} className="text-yellow-600 hover:text-yellow-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(ref._id)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReferencesForm;
