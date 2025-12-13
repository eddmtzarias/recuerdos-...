const express = require('express');
const router = express.Router();
const { cache, autoPaginate } = require('../middleware/memoryManager');

/**
 * GET /api/reminders
 * Obtener todos los recordatorios del usuario
 * Implementa paginación y caché para optimizar memoria
 */
router.get('/', autoPaginate, async (req, res) => {
  try {
    const userId = req.user?.id || 'demo-user';
    const { page, limit, offset } = req.pagination;
    
    // Intentar obtener de cache
    const cacheKey = `reminders:${userId}:${page}:${limit}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return res.json({
        data: cached,
        pagination: { page, limit },
        cached: true
      });
    }

    // Simulación de consulta a base de datos con paginación
    const reminders = [
      {
        id: 1,
        userId,
        title: 'Tarea de Matemáticas',
        description: 'Resolver ejercicios 1-20 del libro',
        subject: 'Matemáticas',
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        priority: 'high',
        completed: false
      },
      {
        id: 2,
        userId,
        title: 'Leer capítulo 5',
        description: 'Historia: Revolución Industrial',
        subject: 'Historia',
        dueDate: new Date(Date.now() + 172800000).toISOString(),
        priority: 'medium',
        completed: false
      }
    ].slice(offset, offset + limit);

    // Guardar en cache por 5 minutos
    cache.set(cacheKey, reminders, 300000);

    res.json({
      data: reminders,
      pagination: { page, limit, total: 2 },
      cached: false
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reminders/:id
 * Obtener un recordatorio específico
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 'demo-user';
    
    const cacheKey = `reminder:${userId}:${id}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return res.json({ data: cached, cached: true });
    }

    // Simulación de búsqueda en base de datos
    const reminder = {
      id: parseInt(id),
      userId,
      title: 'Tarea de Matemáticas',
      description: 'Resolver ejercicios 1-20 del libro',
      subject: 'Matemáticas',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      priority: 'high',
      completed: false,
      createdAt: new Date().toISOString()
    };

    cache.set(cacheKey, reminder, 300000);

    res.json({ data: reminder, cached: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/reminders
 * Crear un nuevo recordatorio
 */
router.post('/', async (req, res) => {
  try {
    const userId = req.user?.id || 'demo-user';
    const { title, description, subject, dueDate, priority, repeat } = req.body;

    // Validación
    if (!title || !dueDate) {
      return res.status(400).json({
        error: 'Los campos title y dueDate son requeridos'
      });
    }

    // Crear recordatorio (simulación)
    const newReminder = {
      id: Date.now(),
      userId,
      title,
      description: description || '',
      subject: subject || 'General',
      dueDate,
      priority: priority || 'medium',
      repeat: repeat || 'none',
      completed: false,
      createdAt: new Date().toISOString()
    };

    // Invalidar cache de lista
    cache.delete(`reminders:${userId}:1:20`);

    res.status(201).json({
      message: 'Recordatorio creado exitosamente',
      data: newReminder
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/reminders/:id
 * Actualizar un recordatorio
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 'demo-user';
    const updates = req.body;

    // Simulación de actualización
    const updatedReminder = {
      id: parseInt(id),
      userId,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Invalidar caches relacionados
    cache.delete(`reminder:${userId}:${id}`);
    cache.delete(`reminders:${userId}:1:20`);

    res.json({
      message: 'Recordatorio actualizado exitosamente',
      data: updatedReminder
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/reminders/:id
 * Eliminar un recordatorio
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 'demo-user';

    // Invalidar caches
    cache.delete(`reminder:${userId}:${id}`);
    cache.delete(`reminders:${userId}:1:20`);

    res.json({
      message: 'Recordatorio eliminado exitosamente',
      id: parseInt(id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/reminders/:id/complete
 * Marcar recordatorio como completado
 */
router.patch('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 'demo-user';

    const updatedReminder = {
      id: parseInt(id),
      userId,
      completed: true,
      completedAt: new Date().toISOString()
    };

    // Invalidar caches
    cache.delete(`reminder:${userId}:${id}`);
    cache.delete(`reminders:${userId}:1:20`);

    res.json({
      message: 'Recordatorio marcado como completado',
      data: updatedReminder
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
