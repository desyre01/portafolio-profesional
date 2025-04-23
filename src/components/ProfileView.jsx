import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileCardView from "../components/ProfileCardView";

const ProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profile/${id}`);
      setProfile(res.data);
    } catch (err) {
      console.error("❌ Error al cargar perfil:", err);
      setError("No se pudo cargar el perfil.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleDeleteAll = async () => {
    if (!window.confirm("¿Seguro que querés borrar este portafolio?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/profile/${id}`);
      alert("Portafolio eliminado correctamente");
      navigate("/");
    } catch (err) {
      console.error("❌ Error al eliminar perfil:", err);
      alert("No se pudo eliminar el portafolio.");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando perfil...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!profile) return null;

  return (
    <div className="relative min-h-screen bg-gray-100 py-10 px-4">
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={() => window.print()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar PDF
        </button>
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>

      <div className="print:shadow-none">
        <ProfileCardView profile={profile} />
      </div>
    </div>
  );
};

export default ProfileView;