const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Error del chatbot:", error.response?.data || error.message);
    res.status(500).json({ error: "Error del servidor en el chatbot" });
  }
});

module.exports = router;
