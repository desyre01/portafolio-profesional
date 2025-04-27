import { NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import { useState } from 'react';

function Navbar() {
  const [openHelp, setOpenHelp] = useState(false);

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <h2 className="text-2xl font-bold text-gray-800"> | Portafolios Profesionales</h2>
          <ul className="flex space-x-8 items-center relative">
            {/* Botón Inicio */}
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center text-blue-600 font-bold"
                    : "flex items-center text-gray-700 hover:text-blue-500 transition-colors"
                }
              >
                <FaHome className="mr-1" /> Inicio
              </NavLink>
            </li>

            {/* Botón Acerca de PortaRed */}
            <li>
              <NavLink
                to="/acerca"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center text-blue-600 font-bold"
                    : "flex items-center text-gray-700 hover:text-blue-500 transition-colors"
                }
              >
                <FaInfoCircle className="mr-1" /> Acerca de PortaRed
              </NavLink>
            </li>

            {/* Botón de Ayuda con submenú */}
            <li className="relative">
              <button
                onClick={() => setOpenHelp(!openHelp)}
                className="flex items-center text-gray-700 hover:text-blue-500 transition-colors focus:outline-none"
              >
                <FaQuestionCircle className="mr-1" /> Ayuda
              </button>

              {/* Submenú desplegable */}
              {openHelp && (
                <div className="absolute top-12 right-0 bg-white border border-gray-200 shadow-xl rounded-lg py-2 w-56 animate-fadeSlide">
                  <NavLink
                    to="/centro-ayuda"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition text-left"
                    onClick={() => setOpenHelp(false)}
                  >
                    Centro de Ayuda
                  </NavLink>
                  <NavLink
                    to="/contacto-soporte"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition text-left"
                    onClick={() => setOpenHelp(false)}
                  >
                    Contactar Soporte
                  </NavLink>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
