import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>¡Hola, soy Jennifer Hernandez!</h1>
        <h2>Desarrollador Web | Desarrolladora Full Stack</h2>
        <p>
          Bienvenido a mi portafolio. Aquí encontrarás información sobre mí, mis proyectos, experiencia y cómo contactarme.
        </p>
        <a href="/projects" className="btn">Ver Proyectos</a>
      </div>
    </div>
  );
}

export default Home;
