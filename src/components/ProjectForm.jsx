// src/components/ProjectForm.jsx
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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("❌ Error al cargar proyectos:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSubmit = async (data) => {
    try {
      let res;
      if (editMode) {
        res = await axios.put(`http://localhost:5000/api/profile/${profileId}/projects/${editingId}`, data);
      } else {
        res = await axios.post(`http://localhost:5000/api/profile/${profileId}/projects`, data);
      }
      if (res.data.projects) {
        setProjects(res.data.projects);
      }
      reset();
      setEditMode(false);
      setEditingId(null);
    } catch (error) {
      console.error("❌ Error al guardar proyecto:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/profile/${profileId}/projects/${id}`);
      setProjects(res.data.projects);
    } catch (error) {
      console.error("❌ Error al eliminar proyecto:", error);
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

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Editar Proyecto" : "Agregar Proyecto"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label>Nombre del Proyecto</label>
          <input {...register("name")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label>Descripción</label>
          <textarea {...register("description")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div>
          <label>Tecnologías Usadas</label>
          <input {...register("technologies")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.technologies?.message}</p>
        </div>

        <div>
          <label>Enlace (opcional)</label>
          <input {...register("link")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.link?.message}</p>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editMode ? "Guardar Cambios" : "Agregar Proyecto"}
        </button>
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
                  <button onClick={() => handleEdit(proj)} className="text-yellow-600 hover:text-yellow-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(proj._id)} className="text-red-600 hover:text-red-800">
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
