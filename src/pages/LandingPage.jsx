import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleCreatePortfolio = () => {
    navigate('/crear-portafolio');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 to-cyan-300 p-8">
      <div className="bg-white p-10 md:p-16 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center w-full max-w-6xl min-h-[450px] opacity-0 translate-y-8 animate-fadeSlide">
        
        {/* Imagen en círculo */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <img
            src="/imagenes/landing.png"
            alt="Imagen de Portafolio"
            className="w-64 h-64 object-cover rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Texto mejorado y botones */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6">
          <h1 className="text-4xl font-bold text-gray-800 whitespace-nowrap text-center md:text-left">
            Crea tu Portafolio Profesional 
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed text-justify">
            En <span className="font-bold text-blue-500">PortaRed</span> te ayudamos a diseñar, organizar y presentar tu trayectoria profesional de forma moderna e impactante.
            <br /><br />
            Construye tu portafolio personal, agrega tus proyectos, habilidades, experiencia laboral y formación académica en un solo lugar.
            Personaliza tu perfil, incluye enlaces, imágenes, videos y destaca tu talento de la mejor manera.
            <br /><br />
            <span className="font-semibold text-blue-600">¡Conquista nuevas oportunidades mostrando lo mejor de ti!</span>
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start w-full">
            <button
              onClick={handleCreatePortfolio}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition w-full md:w-auto"
            >
              Crear Portafolio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
