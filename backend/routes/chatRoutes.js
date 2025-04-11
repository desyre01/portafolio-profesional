const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    res.json(response);
  } catch (error) {
    console.error("❌ Error del chatbot:", error.response?.data || error.message);
    res.status(500).json({ error: "Error del servidor en el chatbot" });
  }
});

module.exports = router;