require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dogRoutes = require('./backend/routes/dogRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');
const dogService = require('./backend/services/dogService');

// ========================
// Configuración inicial
// ========================
const app = express();
const PORT = process.env.PORT || 3000;

// ========================
// 1. Conexión a MongoDB
// ========================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  dogService.loadInitialData(); // Carga inicial de datos
})
.catch(err => console.error('❌ Error de conexión:', err));

// ========================
// 2. Middlewares
// ========================
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/public')));
app.use('/images', express.static(path.join(__dirname, 'frontend/public/images')));

// ========================
// 3. Rutas
// ========================
app.use('/api', dogRoutes);
app.use('/api/admin', adminRoutes);

// Ruta para admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/public/admin.html'));
});

// ========================
// 4. Manejo de errores
// ========================
app.use((err, req, res, next) => {
  console.error('🚨 Error global:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ========================
// Iniciar servidor
// ========================
app.listen(PORT, () => {
  console.log(`
  ====================================
  🚀 Servidor corriendo en: http://localhost:${PORT}
  ====================================
  `);
});