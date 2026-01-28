const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const charactersRoutes = require('./routes/characters.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const commentsRoutes = require('./routes/comments.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');

// Middleware de error
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por windowMs
  message: 'Demasiadas solicitudes, intenta más tarde',
});
app.use(limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/characters', charactersRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🐉 Bienvenido a Dragon Ball Wiki API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth (registro, login)',
      characters: '/api/characters (personajes de Dragon Ball)',
      favorites: '/api/favorites (favoritos del usuario)',
      comments: '/api/comments (comentarios)',
      users: '/api/users (datos del usuario)',
      admin: '/api/admin (panel administrativo)',
      health: '/api/health (estado del servidor)'
    },
    docs: {
      github: 'https://github.com/usuario/dragonball-wiki',
      documentation: 'Ver README.md en el repositorio'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Servidor funcionando' });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    tip: 'Visita GET / para ver los endpoints disponibles',
    baseUrl: process.env.BACKEND_URL || 'http://localhost:3000'
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;
