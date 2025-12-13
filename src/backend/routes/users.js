const express = require('express');
const router = express.Router();
const { cache } = require('../middleware/memoryManager');

/**
 * GET /api/users/:id
 * Obtener perfil de usuario
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const cacheKey = `user:${id}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({ data: cached, cached: true });
    }

    // Simulación de búsqueda en DB
    const user = {
      id: parseInt(id),
      name: 'Usuario Demo',
      email: 'demo@example.com',
      educationLevel: 'university',
      subjects: ['Matemáticas', 'Historia', 'Ciencias'],
      joinedAt: new Date().toISOString()
    };

    cache.set(cacheKey, user, 600000); // 10 minutos

    res.json({ data: user, cached: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/users/:id
 * Actualizar perfil de usuario
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Actualizar usuario (simulación)
    const updatedUser = {
      id: parseInt(id),
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Invalidar cache
    cache.delete(`user:${id}`);

    res.json({
      message: 'Perfil actualizado exitosamente',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/users/:id/stats
 * Obtener estadísticas del usuario
 */
router.get('/:id/stats', async (req, res) => {
  try {
    const { id } = req.params;

    const cacheKey = `user:${id}:stats`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({ data: cached, cached: true });
    }

    // Simulación de estadísticas
    const stats = {
      userId: parseInt(id),
      reminders: {
        total: 25,
        completed: 18,
        pending: 7,
        completionRate: 72
      },
      summaries: {
        total: 12,
        averageLength: 450
      },
      studyTime: {
        thisWeek: 15.5, // horas
        thisMonth: 62,
        trend: 'up'
      },
      subjects: [
        { name: 'Matemáticas', count: 10, progress: 80 },
        { name: 'Historia', count: 8, progress: 65 },
        { name: 'Ciencias', count: 7, progress: 70 }
      ]
    };

    cache.set(cacheKey, stats, 300000); // 5 minutos

    res.json({ data: stats, cached: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
