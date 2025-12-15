const express = require('express');
const router = express.Router();
const { cache } = require('../middleware/memoryManager');

// Límites de contenido para optimización de memoria
const MAX_CONTENT_SIZE = 50000; // 50KB de texto

/**
 * POST /api/summaries/generate
 * Generar resumen automático usando IA
 * Implementa límites de memoria para procesamiento de texto
 */
router.post('/generate', async (req, res) => {
  try {
    const { content, options = {} } = req.body;
    const userId = req.user?.id || 'demo-user';
    if (content.length > MAX_CONTENT_SIZE) {
      return res.status(400).json({
        error: 'El contenido es demasiado largo. Máximo 50,000 caracteres.'
      });
    }

    // Verificar cache
    const contentHash = simpleHash(content);
    const cacheKey = `summary:${contentHash}:${JSON.stringify(options)}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({
        data: cached,
        cached: true
      });
    }

    // Simulación de procesamiento con IA
    const summary = await generateAISummary(content, options);

    // Guardar en cache por 1 hora
    cache.set(cacheKey, summary, 3600000);

    res.json({
      data: summary,
      cached: false
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/summaries/upload
 * Subir archivo y generar resumen
 * Procesa archivos en chunks para optimizar memoria
 */
router.post('/upload', async (req, res) => {
  try {
    // En producción, usar multer con límites de memoria
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    res.json({
      message: 'Endpoint para subida de archivos',
      info: 'Implementar con multer y procesamiento en streaming'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/summaries/:id
 * Obtener un resumen guardado
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 'demo-user';

    const cacheKey = `summary:${userId}:${id}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({ data: cached, cached: true });
    }

    // Simulación de búsqueda en base de datos
    const summary = {
      id: parseInt(id),
      userId,
      title: 'Resumen: Revolución Industrial',
      originalLength: 5000,
      summaryLength: 500,
      keyPoints: [
        'La Revolución Industrial comenzó en Inglaterra en el siglo XVIII',
        'Transformó la economía de agrícola a industrial',
        'Introdujo nuevas tecnologías como la máquina de vapor',
        'Cambió radicalmente la sociedad y las condiciones laborales'
      ],
      fullSummary: 'La Revolución Industrial fue un período de grandes cambios...',
      createdAt: new Date().toISOString()
    };

    cache.set(cacheKey, summary, 3600000);

    res.json({ data: summary, cached: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/summaries
 * Obtener todos los resúmenes del usuario
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id || 'demo-user';
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);

    const cacheKey = `summaries:${userId}:${page}:${limit}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({ data: cached, cached: true });
    }

    // Simulación de lista de resúmenes
    const summaries = [
      {
        id: 1,
        userId,
        title: 'Resumen: Revolución Industrial',
        summaryLength: 500,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        userId,
        title: 'Resumen: Segunda Guerra Mundial',
        summaryLength: 450,
        createdAt: new Date().toISOString()
      }
    ];

    cache.set(cacheKey, summaries, 600000); // 10 minutos

    res.json({ data: summaries, cached: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Helper: Generar resumen con IA (simulado)
 * @param {string} content - Contenido de texto a resumir
 * @param {Object} options - Opciones de configuración del resumen
 * @param {string} options.length - Longitud del resumen: 'brief' (200 palabras) o 'detailed' (500 palabras)
 * @param {boolean} options.includeKeyPoints - Si incluir puntos clave extraídos
 * @param {boolean} options.generateQuestions - Si generar preguntas de estudio
 * @returns {Promise<Object>} Objeto con resumen, puntos clave y preguntas opcionales
 */
async function generateAISummary(content, options) {
  const {
    length = 'brief', // brief, detailed
    includeKeyPoints = true,
    generateQuestions = false
  } = options;

  // Simulación de procesamiento con IA
  await new Promise(resolve => setTimeout(resolve, 1000));

  const words = content.split(/\s+/);
  const summaryLength = length === 'brief' ? 200 : 500;
  const summaryWords = words.slice(0, summaryLength);

  const result = {
    original: {
      length: content.length,
      words: words.length
    },
    summary: {
      text: summaryWords.join(' ') + '...',
      length: summaryWords.join(' ').length,
      words: summaryWords.length
    }
  };

  if (includeKeyPoints) {
    result.keyPoints = [
      'Punto clave extraído del contenido 1',
      'Punto clave extraído del contenido 2',
      'Punto clave extraído del contenido 3'
    ];
  }

  if (generateQuestions) {
    result.studyQuestions = [
      '¿Cuál es la idea principal del texto?',
      '¿Qué conceptos clave se mencionan?',
      '¿Cómo se relacionan estos conceptos?'
    ];
  }

  return result;
}

/**
 * Helper: Hash simple para cacheo
 */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

module.exports = router;
