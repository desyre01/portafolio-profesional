import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ profiles, handleDelete }) => {
  return (
    <div className="container mx-auto px-8 py-8 max-w-[1000px] font-['Segoe UI']">
      <h1 className="text-4xl mb-2 text-center text-gray-800">
        Bienvenido a Mi Portafolio
      </h1>
      
      <p className="text-center text-lg text-gray-600">
        Crea y gestiona tu portafolio profesional
      </p>

      <button className="bg-blue-600 text-white px-5 py-2.5 mx-auto mt-4 mb-4 block rounded-lg hover:bg-blue-700 transition-colors duration-300">
        Crear Nuevo Portafolio
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {profiles.map((profile) => (
          <div 
            key={profile._id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:-translate-y-1 transition-transform duration-200 relative"
          >
            <strong className="text-xl text-gray-800">{profile.name}</strong>
            <p className="my-2 text-gray-600">{profile.profession}</p>
            <p className="text-gray-600">{profile.location}</p>

            <div className="flex justify-between mt-4">
              <Link
                to={`/profile/${profile._id}`}
                className="bg-cyan-600 text-white px-3 py-1.5 rounded text-sm hover:bg-cyan-700 transition-colors"
              >
                Ver
              </Link>
              <Link
                to={`/edit/${profile._id}`}
                className="bg-yellow-500 text-gray-800 px-3 py-1.5 rounded text-sm hover:bg-yellow-600 transition-colors"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(profile._id)}
                className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;