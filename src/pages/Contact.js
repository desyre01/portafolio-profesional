import React, { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contacto</h1>
      <p>Si deseas contactarme, llena el siguiente formulario o envíame un correo.</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Tu Nombre" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Tu Correo" value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Tu Mensaje" value={formData.message} onChange={handleChange} required></textarea>
        <button type="submit">Enviar</button>
      </form>

      <div className="contact-info">
        <p><strong>Email:</strong> desyreh01@gmail.com</p>
        <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer">Mi Perfil</a></p>
      </div>
    </div>
  );
}

export default Contact;
