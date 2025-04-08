require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch(err => console.error("🔴 Error al conectar a MongoDB:", err));

// Rutas principales
const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);

const landingRoutes = require(path.resolve(__dirname, "./routes/landingRoutes"));
app.use("/api/landing", landingRoutes);

const educationRoutes = require("./routes/educationRoutes");
app.use("/api/education", educationRoutes);

// 📌 Ruta del chatbot
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

// Ruta base para verificar funcionamiento
app.get("/api", (req, res) => {
  res.json({ message: "Servidor y API funcionando correctamente" });
});

app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
