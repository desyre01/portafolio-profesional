import React, { useState } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";


const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Botón flotante */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <FaTimes size={20} /> : <FaCommentDots size={20} />}
      </button>

      {/* Caja del chatbot */}
      {isOpen && (
        <div className="mt-2 w-80 h-96 bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex flex-col justify-between">
          <div className="overflow-y-auto flex-grow mb-2">
            <p className="text-sm text-gray-700 mb-2">
              ¡Hola! Soy tu asistente. Preguntame cómo llenar tu portafolio, cómo mejorar tu CV o lo que necesités. 🤖
            </p>
            <p className="text-sm text-gray-400">
              (Esta es una interfaz simulada, podés integrarla con Gemini, Dialogflow o GPT más adelante 😉)
            </p>
          </div>
          <input
            type="text"
            placeholder="Escribí tu pregunta..."
            className="border border-gray-300 p-2 rounded w-full focus:outline-none"
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
