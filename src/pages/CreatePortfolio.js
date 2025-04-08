import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreatePortfolio.css";

const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  profession: yup.string().required("Profesión es requerida"),
  email: yup.string().email("Email inválido").required("Email es requerido"),
  phone: yup.string().required("Teléfono es requerido"),
  location: yup.string().required("Ubicación es requerida"),
});

const CreatePortfolio = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/profile", data);
      alert("✅ Perfil creado con éxito");
      navigate(`/profile/${response.data._id}`);
      reset();
    } catch (error) {
      console.error("❌ Error al crear perfil:", error.response?.data || error.message);
      alert("Ocurrió un error al crear el perfil");
    }
  };

  return (
    <div className="create-portfolio-container">
      <h2>Crear tu Portafolio</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nombre:</label>
        <input {...register("name")} />
        <p className="error">{errors.name?.message}</p>

        <label>Profesión:</label>
        <input {...register("profession")} />
        <p className="error">{errors.profession?.message}</p>

        <label>Email:</label>
        <input {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <label>Teléfono:</label>
        <input {...register("phone")} />
        <p className="error">{errors.phone?.message}</p>

        <label>Ubicación:</label>
        <input {...register("location")} />
        <p className="error">{errors.location?.message}</p>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CreatePortfolio;
