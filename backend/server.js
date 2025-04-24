require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Permitir solo el origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('🔴 Error:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch(err => console.error("🔴 Error al conectar a MongoDB:", err));

// Rutas principales
const profileRoutes = require("./routes/profileRoutes");
const landingRoutes = require("./routes/landingRoutes");
const educationRoutes = require("./routes/educationRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Aplicar rutas
app.use("/api/profile", profileRoutes);
app.use("/api/landing", landingRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/chat", chatRoutes);

// Ruta base para verificar funcionamiento
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok",
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ 
    error: "Ruta no encontrada",
    path: req.path 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔴 Promesa no manejada:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('🔴 Error no capturado:', error);
  process.exit(1);
});