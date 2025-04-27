import { useNavigate } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa'; 

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-cyan-300 flex flex-col">
      {/* Barra de navegación */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Inicio</h1>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          Volver
        </button>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1">
        {/* Sección Bienvenida */}
        <div className="flex flex-col items-center justify-center mt-16 mb-10">
          <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 md:p-8 max-w-xl text-center animate-fadeSlide">
            
            {/* Icono arriba del título */}
            <div className="flex justify-center mb-4">
              <FaBriefcase className="text-6xl text-blue-400" />
            </div>

            {/* Título y subtítulo */}
            <h1 className="text-4xl font-bold text-gray-800 mb-3 whitespace-nowrap">
              Bienvenido a tu Portafolio
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Explora, crea y gestiona tus perfiles profesionales de manera sencilla y moderna.
            </p>
          </div>
        </div>

        {/* Sección Servicios */}
        <section className="py-12 px-6 md:px-20">
          <h3 className="text-3xl font-bold text-white mb-8">¿Qué puedes hacer aquí?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4">Crear tu Portafolio</h4>
              <p className="text-gray-600">Agrega tu información profesional en pocos pasos.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4">Editar y Actualizar</h4>
              <p className="text-gray-600">Modifica fácilmente tu perfil cuando quieras.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4">Compartir tu Perfil</h4>
              <p className="text-gray-600">Comparte tu portafolio con empleadores o contactos.</p>
            </div>
          </div>
        </section>

        {/* Botones rápidos */}
        <section className="text-center py-12">
          <button
            onClick={() => navigate('/crear-portafolio')}
            className="px-8 py-4 m-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-lg"
          >
            Crear Portafolio
          </button>
          <button
            onClick={() => navigate('/ver-portafolios')}
            className="px-8 py-4 m-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg text-lg"
          >
            Ver Portafolios
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-600">
        {/* Puedes agregar aquí contenido del pie de página */}
      </footer>
    </div>
  );
}
