import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h2 className="text-2xl font-bold text-gray-800">Mi Portafolio</h2>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-blue-500 transition-colors">
                Sobre Mí
              </Link>
            </li>
            <li>
              <Link to="/projects" className="text-gray-700 hover:text-blue-500 transition-colors">
                Proyectos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-blue-500 transition-colors">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;