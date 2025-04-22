import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile");
        setProfiles(response.data);
      } catch (error) {
        console.error("❌ Error al obtener perfiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este perfil?")) {
      try {
        await axios.delete(`http://localhost:5000/api/profile/${id}`);
        setProfiles((prev) => prev.filter((p) => p._id !== id));
      } catch (err) {
        console.error("❌ Error al eliminar perfil:", err);
        alert("Error al eliminar perfil.");
      }
    }
  };

  return (
    <div className="px-4 md:px-10 py-10 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Bienvenido a Mi Portafolio</h1>
        <p className="text-gray-600">Explora y crea tu propio portafolio profesional.</p>
        <button
          onClick={() => navigate("/create")}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Comenzar
        </button>
      </div>

      <hr className="my-8" />

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Perfiles Registrados</h2>

        {profiles.length === 0 ? (
          <p className="text-gray-500">No hay perfiles aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-white shadow-md p-6 rounded-lg relative border border-gray-200"
              >
                <h3 className="text-xl font-bold">{profile.name}</h3>
                <p className="text-gray-600">{profile.profession}</p>
                <p className="text-sm text-gray-400">{profile.location}</p>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/profile/${profile._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/personal-info/${profile._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(profile._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
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
}

export default LandingPage;
