import React from 'react';

const ProfileCardView = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Información Personal */}
      <div className="mb-8">
        <div className="flex items-center gap-6">
          {profile.photoURL && (
            <img
              src={profile.photoURL}
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-xl text-gray-600">{profile.profession}</p>
            <p className="text-gray-500">{profile.location}</p>
          </div>
        </div>
        {profile.description && (
          <p className="mt-4 text-gray-700">{profile.description}</p>
        )}
      </div>

      {/* Contacto y Redes Sociales */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {profile.email && (
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
        )}
        {profile.phone && (
          <p className="text-gray-700">
            <span className="font-semibold">Teléfono:</span> {profile.phone}
          </p>
        )}
        {profile.socials && Object.entries(profile.socials).map(([key, value]) => (
          value && (
            <a
              key={key}
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </a>
          )
        ))}
      </div>

      {/* Educación */}
      {profile.education && profile.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Educación</h2>
          <div className="space-y-4">
            {profile.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold">{edu.institution}</h3>
                <p className="text-gray-600">{edu.degree}</p>
                <p className="text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experiencia */}
      {profile.experience && profile.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Experiencia Laboral</h2>
          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold">{exp.company}</h3>
                <p className="text-gray-600">{exp.position}</p>
                <p className="text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Habilidades */}
      {profile.skills && profile.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full text-gray-700"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Idiomas */}
      {profile.languages && profile.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Idiomas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {profile.languages.map((lang, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium">{lang.language}</span>
                <span className="text-gray-600">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCardView;