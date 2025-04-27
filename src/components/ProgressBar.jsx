import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-cyan-300">
      {/* Barra de navegación */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Inicio</h1>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          Volver al Landing
        </button>
      </nav>

      {/* Contenido principal */}
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <h2 className="text-4xl font-bold text-white mb-4">Bienvenido al Home</h2>
        <p className="text-lg text-white">Aquí puedes gestionar tu portafolio o explorar las funciones disponibles.</p>
      </div>
    </div>
  );
}

// ProgressBar.jsx
export function ProgressBar({ currentStep, steps }) {
  const percentage = ((currentStep - 1) / (steps - 1)) * 100;

  return (
    <div className="w-full px-8 mt-10">
      <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-white mt-2">
        {[...Array(steps)].map((_, idx) => (
          <div key={idx}>{`Paso ${idx + 1}`}</div>
        ))}
      </div>
    </div>
  );
}
