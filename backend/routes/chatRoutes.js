const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

// Configuración de OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

// Ruta para procesar mensajes del chat
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    // Crear el mensaje para el asistente
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un asistente útil especializado en ayudar a las personas a crear y mejorar sus portafolios profesionales y CVs. Proporciona consejos específicos y prácticos."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extraer la respuesta
    const response = completion.data.choices[0].message.content;

    res.json({ response });
  } catch (error) {
    console.error('❌ Error en el chatbot:', error);
    res.status(500).json({ 
      error: 'Error al procesar el mensaje',
      details: error.message 
    });
  }
});

module.exports = router;