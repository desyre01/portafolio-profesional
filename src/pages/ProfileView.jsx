import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const ProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentRef = useRef();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profile/${id}`);
      setProfile(res.data);
    } catch (err) {
      console.error("❌ Error al cargar perfil:", err);
      setError("No se pudo cargar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Mi_Portafolio",
  });

  if (loading) return <p className="text-center mt-10">Cargando perfil...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center w-full">{profile.name}</h2>
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar a PDF
        </button>
      </div>

      <div ref={componentRef}>
        <p className="text-center text-gray-600">{profile.profession}</p>
        <p className="text-center mb-4">
          {profile.email} | {profile.phone} | {profile.location}
        </p>

        <hr className="my-6" />

        {/* EDUCACIÓN */}
        <section>
          <h3 className="text-xl font-semibold mb-2">🎓 Educación</h3>
          {profile.education.length === 0 ? (
            <p className="text-gray-500">No hay educación registrada.</p>
          ) : (
            profile.education.map((edu) => (
              <div key={edu._id} className="mb-3">
                <strong>{edu.institution}</strong> - {edu.degree}
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.description && <p>{edu.description}</p>}
              </div>
            ))
          )}
        </section>

        {/* EXPERIENCIA */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-2">💼 Experiencia</h3>
          {profile.experience.length === 0 ? (
            <p className="text-gray-500">No hay experiencia registrada.</p>
          ) : (
            profile.experience.map((exp) => (
              <div key={exp._id} className="mb-3">
                <strong>{exp.company}</strong> - {exp.position}
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </p>
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))
          )}
        </section>

        {/* PROYECTOS */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-2">📁 Proyectos</h3>
          {profile.projects.length === 0 ? (
            <p className="text-gray-500">No hay proyectos registrados.</p>
          ) : (
            profile.projects.map((proj) => (
              <div key={proj._id} className="mb-3">
                <strong>{proj.name}</strong>
                <p>{proj.description}</p>
                <p className="text-sm text-gray-600">{proj.technologies}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    Ver proyecto
                  </a>
                )}
              </div>
            ))
          )}
        </section>

        {/* HABILIDADES */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-2">🛠️ Habilidades</h3>
          {profile.skills.length === 0 ? (
            <p className="text-gray-500">No hay habilidades registradas.</p>
          ) : (
            profile.skills.map((skill) => (
              <div key={skill._id}>
                <strong>{skill.name}</strong> ({skill.category}) -{" "}
                {"⭐".repeat(skill.level)}
              </div>
            ))
          )}
        </section>

        {/* IDIOMAS */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-2">🌐 Idiomas</h3>
          {profile.languages.length === 0 ? (
            <p className="text-gray-500">No hay idiomas registrados.</p>
          ) : (
            profile.languages.map((lang) => (
              <div key={lang._id}>
                <strong>{lang.language}</strong>: {lang.level}
              </div>
            ))
          )}
        </section>

        {/* REFERENCIAS */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-2">🧾 Referencias</h3>
          {profile.references.length === 0 ? (
            <p className="text-gray-500">No hay referencias.</p>
          ) : (
            profile.references.map((ref) => (
              <div key={ref._id} className="mb-4">
                <blockquote className="italic text-gray-600">"{ref.testimony}"</blockquote>
                <p>
                  <strong>{ref.name}</strong> – {ref.relationship}
                </p>
              </div>
            ))
          )}
        </section>

        {/* REDES SOCIALES */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-2">📱 Redes Sociales</h3>
          {profile.socials ? (
            <div className="space-y-1">
              {Object.entries(profile.socials).map(([key, value]) =>
                value ? (
                  <p key={key}>
                    <a href={value} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </a>
                  </p>
                ) : null
              )}
            </div>
          ) : (
            <p className="text-gray-500">No hay redes sociales registradas.</p>
          )}
        </section>
      </div>

      {/* BOTÓN DE ELIMINAR PORTAFOLIO */}
      <button
        onClick={handleDeleteAll}
        className="mt-8 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Eliminar portafolio
      </button>
    </div>
  );
};

export default ProfileView;
