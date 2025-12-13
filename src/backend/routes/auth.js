const express = require('express');
const router = express.Router();

/**
 * POST /api/auth/register
 * Registrar nuevo usuario
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, educationLevel } = req.body;

    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Los campos name, email y password son requeridos'
      });
    }

    // En producción: hashear password, validar email único, etc.
    const newUser = {
      id: Date.now(),
      name,
      email,
      educationLevel: educationLevel || 'university',
      createdAt: new Date().toISOString()
    };

    // Generar token (en producción usar JWT)
    const token = Buffer.from(`${newUser.id}:${Date.now()}`).toString('base64');

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      data: {
        user: newUser,
        token
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/auth/login
 * Iniciar sesión
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email y password son requeridos'
      });
    }

    // En producción: verificar credenciales contra base de datos
    const user = {
      id: 1,
      name: 'Usuario Demo',
      email,
      educationLevel: 'university'
    };

    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    res.json({
      message: 'Login exitoso',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/auth/logout
 * Cerrar sesión
 */
router.post('/logout', async (req, res) => {
  try {
    // En producción: invalidar token, limpiar sesión
    res.json({
      message: 'Logout exitoso'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/auth/me
 * Obtener información del usuario autenticado
 */
router.get('/me', async (req, res) => {
  try {
    // En producción: verificar token y obtener usuario de DB
    const user = {
      id: 1,
      name: 'Usuario Demo',
      email: 'demo@example.com',
      educationLevel: 'university',
      preferences: {
        notifications: true,
        theme: 'light'
      }
    };

    res.json({
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
