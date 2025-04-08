import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Mi Portafolio</h2>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Sobre Mí</Link></li>
        <li><Link to="/projects">Proyectos</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
