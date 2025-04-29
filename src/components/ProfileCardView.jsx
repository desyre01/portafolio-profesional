import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const ProfileCardView = ({ profile }) => {
  if (!profile) return null;

  // Íconos de redes sociales
  const socialIcons = {
    linkedin: <FaLinkedin />,
    github: <FaGithub />,
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      {/* Información Personal */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p className="text-xl text-gray-600">{profile.profession}</p>
        <p className="text-gray-500">{profile.location}</p>
        <div className="flex justify-center gap-8 mt-4 text-gray-700">
          {profile.email && <p><strong>Email:</strong> {profile.email}</p>}
          {profile.phone && <p><strong>Teléfono:</strong> {profile.phone}</p>}
        </div>
      </div>

      {/* Redes Sociales */}
      {profile.socials && Object.keys(profile.socials).length > 0 && (
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Redes Sociales</h2>
          <div className="flex justify-center flex-wrap gap-6 text-blue-600">
            {Object.entries(profile.socials).map(([key, value]) => (
              value && (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-800 transition"
                >
                  {socialIcons[key] || null} {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              )
            ))}
          </div>
        </div>
      )}

      {/* Educación */}
      {profile.education && profile.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Educación</h2>
          {profile.education.map((edu, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 mb-4">
              <h3 className="font-semibold">{edu.institution}</h3>
              <p>{edu.degree}</p>
              <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {/* Experiencia Laboral */}
      {profile.experience && profile.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Experiencia Laboral</h2>
          {profile.experience.map((exp, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4 mb-4">
              <h3 className="font-semibold">{exp.company}</h3>
              <p>{exp.position}</p>
              <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Proyectos */}
      {profile.projects && profile.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
          {profile.projects.map((project, index) => (
            <div key={index} className="border-l-4 border-purple-500 pl-4 mb-4">
              <h3 className="font-semibold">{project.name}</h3>
              <p>{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Ver Proyecto
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Habilidades */}
      {profile.skills && profile.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Habilidades</h2>
          <div className="flex flex-wrap gap-4">
            {profile.skills.map((skill, index) => (
              <div key={index} className="bg-gray-200 rounded-lg px-4 py-2 shadow-sm text-center">
                <p className="font-semibold">{skill.name}</p>
                <p className="text-gray-600">{skill.category}</p>
                <div className="flex justify-center mt-1">
                  {Array(skill.level).fill().map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  {Array(5 - skill.level).fill().map((_, i) => (
                    <span key={i} className="text-gray-300">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Idiomas */}
      {profile.languages && profile.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Idiomas</h2>
          <ul className="list-disc list-inside text-gray-700">
            {profile.languages.map((lang, index) => (
              <li key={index}>
                {lang.language} - {lang.level}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Referencias */}
      {profile.references && profile.references.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          {profile.references.map((ref, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
              <p className="font-semibold">{ref.name}</p>
              <p className="text-gray-600">{ref.relationship}</p>
              <p className="italic mt-2">"{ref.testimony}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileCardView;
