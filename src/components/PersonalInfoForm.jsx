import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
;

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  profession: yup.string().required("La profesión es obligatoria"),
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  phone: yup.string().required("El teléfono es obligatorio"),
  location: yup.string().required("La ubicación es obligatoria"),
});

const PersonalInfoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  
  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          const res = await axios.get(`http://localhost:5000/api/profile/${id}`);
          const { name, profession, email, phone, location } = res.data;
          setValue("name", name);
          setValue("profession", profession);
          setValue("email", email);
          setValue("phone", phone);
          setValue("location", location);
        } catch (error) {
          console.error("❌ Error al cargar el perfil:", error);
        }
      }
    };

    fetchProfile();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const url = id
        ? `http://localhost:5000/api/profile/${id}`
        : `http://localhost:5000/api/profile`;

      const method = id ? "put" : "post";
      const response = await axios[method](url, data);

      const profileId = response.data._id;
      navigate(`/profile/${profileId}`);
    } catch (error) {
      console.error("❌ Error al guardar el perfil:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {id ? "Editar Información Personal" : "Crear Perfil"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            {...register("name")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block font-medium">Profesión</label>
          <input
            {...register("profession")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p className="text-red-500 text-sm">{errors.profession?.message}</p>
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block font-medium">Teléfono</label>
          <input
            {...register("phone")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>

        <div>
          <label className="block font-medium">Ubicación</label>
          <input
            {...register("location")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p className="text-red-500 text-sm">{errors.location?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
        >
          {id ? "Guardar Cambios" : "Crear Perfil"}
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
