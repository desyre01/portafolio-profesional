export default function AcercaDe() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-4xl w-full text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-8">Acerca de PortaRed</h2>
          <p className="text-gray-600 text-xl leading-relaxed mb-10">
            PortaRed es una plataforma diseñada para ayudarte a construir, organizar y presentar tu portafolio profesional de manera sencilla y moderna. 
            Aquí puedes reunir tu experiencia laboral, tu formación académica, tus proyectos destacados y tus habilidades en un solo lugar, con un diseño limpio y elegante.
            <br /><br />
            Nuestro objetivo es brindarte las herramientas necesarias para que muestres todo tu potencial a empleadores, clientes o instituciones educativas de forma atractiva, accesible y eficiente. 
            PortaRed combina facilidad de uso, personalización y presentación profesional en un mismo espacio.
          </p>
          <div className="flex justify-center">
            <img
              src="/imagenes/nueva-imagenportared.png"
              alt="PortaRed"
              className="w-72 h-72 object-cover rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    );
  }
  