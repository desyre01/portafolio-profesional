import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ profiles, handleDelete }) => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 font-['Segoe UI']">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-3">
          Bienvenido a Mi Portafolio
        </h1>
        <p className="text-gray-600 text-lg">
          Explorá y creá tu propio portafolio profesional en minutos.
        </p>

        {/* Botón de Comenzar */}
        <Link to="/crear-portafolio">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 mt-6 rounded-lg transition-colors">
            Comenzar
          </button>
        </Link>
      </div>

      {/* Perfiles Registrados */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Perfiles Registrados
        </h2>

        {profiles.length === 0 ? (
          <p className="text-gray-500">No hay perfiles aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {profile.name}
                </h3>
                <p className="text-gray-600">{profile.profession}</p>
                <p className="text-gray-500">{profile.location}</p>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/profile/${profile._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/edit/${profile._id}`}
                    className="bg-yellow-400 text-gray-800 px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(profile._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
