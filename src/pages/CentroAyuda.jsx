import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function CentroAyuda() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Cómo creo mi primer portafolio?",
      answer: "Para crear tu primer portafolio en PortaRed, simplemente haz clic en el botón 'Crear Portafolio' desde la página de inicio. Luego completa paso a paso tu información personal, educación, experiencia laboral, habilidades y proyectos. No te preocupes, puedes guardar cambios en cualquier momento y regresar luego para continuar editando."
    },
    {
      question: "¿Puedo editar mi información después?",
      answer: "Sí, PortaRed está diseñado para ser flexible. Después de crear tu portafolio, puedes editar cualquier sección en el momento que desees. Solo ingresa a tu cuenta, selecciona tu portafolio, elige la sección que quieres modificar y guarda los cambios. No hay límites de ediciones."
    },
    {
      question: "¿Cómo agregar proyectos o experiencia laboral?",
      answer: "Dentro de tu perfil encontrarás secciones dedicadas a proyectos y experiencias laborales. Solo haz clic en 'Agregar Proyecto' o 'Agregar Experiencia Laboral', completa los detalles necesarios como título, descripción, fechas y logros, y guarda. Puedes añadir tantos proyectos y experiencias como quieras."
    },
    {
      question: "¿Puedo descargar mi portafolio en PDF?",
      answer: "¡Claro que sí! PortaRed ofrece la opción de exportar tu portafolio en formato PDF. Desde la vista previa de tu portafolio encontrarás el botón 'Exportar a PDF'. Esto te permitirá generar una copia elegante y profesional lista para compartir o imprimir."
    },
    {
      question: "¿Cómo contacto al soporte si tengo problemas?",
      answer: "Si necesitas ayuda personalizada, puedes contactarnos directamente a través de nuestro correo soporte@portared.com. También puedes utilizar el formulario de contacto disponible en la sección 'Contacto Soporte', donde podrás describir tu problema o consulta. Nuestro equipo te responderá lo antes posible."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-cyan-300 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">¿En qué te podemos ayudar?</h1>
        <p className="text-center text-gray-600 text-lg mb-8">
          Encuentra aquí respuestas completas a tus dudas más comunes sobre PortaRed.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center w-full p-4 text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                {faq.question}
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 text-gray-600 bg-gray-50 text-justify">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botón de contacto al final */}
        <div className="mt-10 text-center">
          <p className="text-gray-700 mb-4">¿No encontraste respuesta a tu duda?</p>
          <button
            onClick={() => navigate('/contacto-soporte')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Escríbenos aquí
          </button>
        </div>
      </div>
    </div>
  );
}
