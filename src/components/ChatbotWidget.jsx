import React, { useState } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: '¡Hola! Soy tu asistente. Preguntame cómo llenar tu portafolio, cómo mejorar tu CV o lo que necesités. 🤖'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      // Agregar respuesta del bot
      setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta nuevamente.' 
      }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <FaTimes size={20} /> : <FaCommentDots size={20} />}
      </button>

      {isOpen && (
        <div className="mt-2 w-80 h-96 bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex flex-col">
          <div className="overflow-y-auto flex-grow mb-2 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`p-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-100 ml-auto' 
                    : 'bg-gray-100'
                } max-w-[80%]`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-500">
                <p>Pensando...</p>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="mt-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu pregunta..."
              className="border border-gray-300 p-2 rounded w-full focus:outline-none"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;