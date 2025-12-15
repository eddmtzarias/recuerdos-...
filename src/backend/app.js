const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Importar routers
const authRouter = require('./routes/auth');
const remindersRouter = require('./routes/reminders');
const summariesRouter = require('./routes/summaries');
const usersRouter = require('./routes/users');

// Middleware de memoria
const memoryManager = require('./middleware/memoryManager');

const app = express();
const PORT = process.env.PORT || 3000;

// Seguridad y optimización
app.use(helmet());
app.use(compression()); // Compresión de respuestas para reducir uso de memoria
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Limitar tamaño de payload

// Rate limiting para prevenir abuso de memoria
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta más tarde.'
});
app.use('/api/', limiter);

// Middleware de gestión de memoria
app.use(memoryManager.trackMemoryUsage);
app.use(memoryManager.clearCacheOnLowMemory);

// Health check
app.get('/health', (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
    }
  });
});

// Rutas de API
app.use('/api/auth', authRouter);
app.use('/api/reminders', remindersRouter);
app.use('/api/summaries', summariesRouter);
app.use('/api/users', usersRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Limpiar recursos en caso de error
  if (req.tempFiles) {
    req.tempFiles.forEach(file => {
      // Limpiar archivos temporales
    });
  }
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Error interno del servidor',
      status: err.status || 500
    }
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'Ruta no encontrada',
      status: 404
    }
  });
});

// Limpieza periódica de memoria
setInterval(() => {
  if (global.gc) {
    global.gc();
    console.log('Garbage collection ejecutado');
  }
}, 60000); // Cada minuto

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Memoria inicial: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  // Cerrar conexiones de base de datos, cache, etc.
  process.exit(0);
});

module.exports = app;
