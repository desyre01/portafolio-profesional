import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const profileId = "67f2005a56202f2256f17212";

const schema = yup.object().shape({
  name: yup.string().required("Nombre del proyecto es requerido"),
  description: yup.string().required("Descripción es requerida"),
  technologies: yup.string().required("Tecnologías usadas es requerido"),
  link: yup.string().url("Debe ser un enlace válido").nullable(),
});

const ProjectForm = () => {
  const [projects, setProjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
      if (res.data && Array.isArray(res.data.projects)) {
        setProjects(res.data.projects);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("❌ Error al cargar proyectos:", err);
      setError("Error al cargar los proyectos. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      const url = `http://localhost:5000/api/profile/${profileId}/projects${editMode ? `/${editingId}` : ''}`;
      const method = editMode ? 'put' : 'post';
      
      const res = await axios[method](url, data);

      if (res.data && Array.isArray(res.data.projects)) {
        setProjects(res.data.projects);
        reset();
        setEditMode(false);
        setEditingId(null);
      } else {
        throw new Error("Formato de respuesta inválido");
      }
    } catch (error) {
      console.error("❌ Error al guardar proyecto:", error);
      setError(error.response?.data?.error || "Error al guardar. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro que deseas eliminar este proyecto?")) return;

    try {
      setIsLoading(true);
      setError(null);

      const res = await axios.delete(
        `http://localhost:5000/api/profile/${profileId}/projects/${id}`
      );

      if (res.data && Array.isArray(res.data.projects)) {
        setProjects(res.data.projects);
      } else {
        throw new Error("Formato de respuesta inválido");
      }
    } catch (error) {
      console.error("❌ Error al eliminar proyecto:", error);
      setError(error.response?.data?.error || "Error al eliminar. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditMode(true);
    setEditingId(project._id);
    setValue("name", project.name);
    setValue("description", project.description);
    setValue("technologies", project.technologies);
    setValue("link", project.link || "");
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditingId(null);
    reset();
  };

  if (isLoading) {
    return <div className="text-center py-4">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Proyecto" : "Agregar Proyecto"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label className="block">Nombre del Proyecto</label>
          <input
            {...register("name")}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block">Descripción</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div>
          <label className="block">Tecnologías Usadas</label>
          <input
            {...register("technologies")}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.technologies?.message}</p>
        </div>

        <div>
          <label className="block">Enlace (opcional)</label>
          <input
            {...register("link")}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.link?.message}</p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
          >
            {isLoading ? "Guardando..." : editMode ? "Guardar Cambios" : "Agregar Proyecto"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Proyectos Registrados:</h3>
        {projects.length === 0 ? (
          <p className="text-gray-500">No hay proyectos aún.</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((proj) => (
              <li key={proj._id} className="border p-4 rounded bg-gray-50 shadow-sm relative">
                <p><strong>Nombre:</strong> {proj.name}</p>
                <p><strong>Descripción:</strong> {proj.description}</p>
                <p><strong>Tecnologías:</strong> {proj.technologies}</p>
                {proj.link && (
                  <p>
                    <strong>Enlace:</strong>{" "}
                    <a href={proj.link} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                      {proj.link}
                    </a>
                  </p>
                )}
                <div className="absolute top-2 right-2 flex gap-3">
                  <button
                    onClick={() => handleEdit(proj)}
                    className="text-yellow-600 hover:text-yellow-800 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    disabled={isLoading}
                  >
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

export default ProjectForm;