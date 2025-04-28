import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Portfolios() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/profile/");
      setProfiles(res.data);
    } catch (error) {
      console.error("Error al cargar perfiles:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este portafolio?")) {
      try {
        await axios.delete(`http://localhost:5000/api/profile/${id}`);
        fetchProfiles(); // Actualizar lista
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-cyan-300 p-8 flex flex-col">

      {/* Barra superior */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Portafolios Registrados</h1>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition"
        >
          Volver al Inicio
        </button>
      </div>

      {/* Lista de perfiles */}
      {profiles.length === 0 ? (
        <p className="text-white text-center text-lg">No hay portafolios registrados aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile) => (
            <div
              key={profile._id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-center"
            >
              {/* Imagen de Avatar */}
              <div className="flex justify-center mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=0D8ABC&color=fff&rounded=true&size=128`}
                  alt="Avatar"
                  className="rounded-full w-24 h-24 object-cover shadow-lg"
                />
              </div>

              {/* Información del Perfil */}
              <h4 className="text-2xl font-extrabold text-gray-800 mb-2">{profile.name}</h4>
              <p className="text-blue-500 text-lg font-medium">{profile.profession}</p>
              <p className="text-gray-500 mb-6">{profile.location}</p>

              {/* Botones */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate(`/profile/${profile._id}`)}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition"
                >
                  Ver Perfil
                </button>
                <button
                  onClick={() => handleDelete(profile._id)}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
