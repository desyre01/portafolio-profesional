import React from "react";
import "../styles/Projects.css";

const projects = [
  {
    id: 1,
    title: "Proyecto 1",
    description: "Descripción breve del proyecto 1.",
    image: "https://via.placeholder.com/300",
    link: "https://github.com/tuusuario/proyecto1"
  },
  {
    id: 2,
    title: "Proyecto 2",
    description: "Descripción breve del proyecto 2.",
    image: "https://via.placeholder.com/300",
    link: "https://github.com/tuusuario/proyecto2"
  },
  {
    id: 3,
    title: "Proyecto 3",
    description: "Descripción breve del proyecto 3.",
    image: "https://via.placeholder.com/300",
    link: "https://github.com/tuusuario/proyecto3"
  }
];

function Projects() {
  return (
    <div className="projects-container">
      <h1>Mis Proyectos</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.title} />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">Ver Proyecto</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
