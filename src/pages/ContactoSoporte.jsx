import { useState } from 'react';

export default function ContactoSoporte() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      alert('Por favor completa todos los campos.');
      return;
    }

    console.log('Datos enviados:', formData);
    setEnviado(true);

    setFormData({ nombre: '', correo: '', mensaje: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-cyan-300 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Contáctanos</h1>
        <p className="text-center text-gray-600 text-lg mb-8">
          ¿Tienes un problema o una consulta? Rellena el siguiente formulario y nuestro equipo te contactará.
        </p>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Mensaje</label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                rows="5"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Enviar Mensaje
            </button>
          </form>
        ) : (
          <div className="text-center text-gray-700 space-y-6">
            <div className="text-green-600 text-xl font-semibold">
              ¡Gracias! Tu mensaje ha sido enviado correctamente.
            </div>

            {/* Información de soporte después de enviar */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p><strong>Correo de soporte:</strong> soporte@portared.com</p>
              <p className="mt-2"><strong>Horario de atención:</strong> Lunes a Viernes, 9:00 AM a 6:00 PM</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
