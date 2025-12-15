# Guía de Optimización de Memoria

## Introducción

Este documento detalla las mejores prácticas de gestión de memoria implementadas en el proyecto y cómo aplicarlas en el desarrollo de aplicaciones educativas.

## 1. Implementación de Caché con LRU

### ¿Qué es LRU?

LRU (Least Recently Used) es un algoritmo que elimina los elementos menos recientemente usados cuando el caché alcanza su capacidad máxima.

### Implementación

```javascript
class MemoryCache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key) {
    if (this.cache.has(key)) {
      const item = this.cache.get(key);
      // Verificar expiración
      if (item.expiry && Date.now() > item.expiry) {
        this.cache.delete(key);
        return null;
      }
      return item.value;
    }
    return null;
  }

  set(key, value, ttl = 300000) {
    // Si está lleno, eliminar el más antiguo
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, {
      value,
      expiry: ttl ? Date.now() + ttl : null
    });
  }
}
```

### Beneficios
- Limita el uso de memoria
- Mantiene datos frecuentemente accedidos
- Mejora el rendimiento general

## 2. Paginación Automática

### Propósito

Evitar cargar grandes volúmenes de datos en memoria de una sola vez.

### Implementación

```javascript
function autoPaginate(req, res, next) {
  req.pagination = {
    page: parseInt(req.query.page) || 1,
    limit: Math.min(parseInt(req.query.limit) || 20, 100),
    offset: 0
  };
  req.pagination.offset = (req.pagination.page - 1) * req.pagination.limit;
  next();
}
```

### Reglas
- Límite máximo: 100 items por request
- Default: 20 items
- Siempre incluir información de paginación en respuestas

## 3. Streaming de Datos

### Cuándo usar

Cuando se trabaja con grandes conjuntos de datos que no caben en memoria.

### Implementación

```javascript
function streamLargeData(data, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'chunked'
  });

  res.write('[');
  data.forEach((item, index) => {
    res.write(JSON.stringify(item));
    if (index < data.length - 1) {
      res.write(',');
    }
    // Liberar memoria cada 100 items
    if (index % 100 === 0 && global.gc) {
      global.gc();
    }
  });
  res.write(']');
  res.end();
}
```

### Ventajas
- Procesa datos en chunks
- Libera memoria periódicamente
- Reduce picos de uso de memoria

## 4. Pool de Conexiones

### Problema

Crear y cerrar conexiones a base de datos es costoso en memoria y tiempo.

### Solución

```javascript
class ConnectionPool {
  constructor(maxConnections = 10) {
    this.connections = [];
    this.maxConnections = maxConnections;
    this.activeConnections = 0;
  }

  async acquire() {
    if (this.connections.length > 0) {
      return this.connections.pop();
    }
    if (this.activeConnections < this.maxConnections) {
      this.activeConnections++;
      return createNewConnection();
    }
    // Esperar a que se libere una conexión
    return await this.waitForConnection();
  }

  release(connection) {
    if (this.connections.length < this.maxConnections) {
      this.connections.push(connection);
    }
  }
}
```

### Configuración Recomendada
- Desarrollo: 5-10 conexiones
- Producción: 20-50 conexiones (según carga)

## 5. Compresión de Respuestas

### Implementación

```javascript
const compression = require('compression');
app.use(compression());
```

### Impacto
- Reduce tamaño de respuestas HTTP hasta 70%
- Menor uso de ancho de banda
- Menos memoria en tránsito

## 6. Rate Limiting

### Propósito

Prevenir abuso y picos de uso de memoria por ataques.

### Configuración

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por ventana
  message: 'Demasiadas solicitudes'
});

app.use('/api/', limiter);
```

## 7. Monitoreo de Memoria

### Tracking por Request

```javascript
function trackMemoryUsage(req, res, next) {
  const start = Date.now();
  const startMemory = process.memoryUsage().heapUsed;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const memoryDiff = process.memoryUsage().heapUsed - startMemory;

    if (memoryDiff > 10 * 1024 * 1024) { // > 10MB
      console.warn(`Request usó ${Math.round(memoryDiff / 1024 / 1024)}MB`);
    }
  });

  next();
}
```

### Métricas Importantes

- **RSS** (Resident Set Size): Memoria total usada
- **Heap Used**: Memoria heap utilizada
- **Heap Total**: Memoria heap total asignada
- **External**: Memoria de objetos C++ vinculados

## 8. Garbage Collection

### Automático

Node.js maneja GC automáticamente, pero podemos optimizar:

```javascript
// Limpieza periódica (cada minuto)
setInterval(() => {
  if (global.gc) {
    global.gc();
    console.log('GC ejecutado');
  }
}, 60000);
```

### Forzar GC (desarrollo)

```bash
node --expose-gc app.js
```

## 9. Límites de Payload

### Prevenir ataques de memoria

```javascript
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

### Validación de contenido

```javascript
const MAX_CONTENT_SIZE = 50000; // 50KB de texto

if (content.length > MAX_CONTENT_SIZE) {
  return res.status(400).json({
    error: 'Contenido demasiado largo'
  });
}
```

## 10. Limpieza Automática

### Detectar memoria baja

```javascript
function clearCacheOnLowMemory(req, res, next) {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedPercentage = ((totalMemory - freeMemory) / totalMemory) * 100;

  if (usedPercentage > 85) {
    console.warn(`Memoria al ${usedPercentage}%, limpiando cache...`);
    cache.clear();
    if (global.gc) global.gc();
  }

  next();
}
```

## Checklist de Mejores Prácticas

- [x] Implementar caché con límite de tamaño
- [x] Configurar TTL para datos cacheados
- [x] Usar paginación en todas las listas
- [x] Implementar pool de conexiones
- [x] Comprimir respuestas HTTP
- [x] Rate limiting configurado
- [x] Límites de payload establecidos
- [x] Monitoreo de memoria activo
- [x] Garbage collection periódico
- [x] Streaming para grandes datasets
- [x] Validación de tamaño de input
- [x] Limpieza automática de cache

## Métricas de Éxito

### Memoria
- Uso de heap < 200MB en idle
- Sin memory leaks detectables
- GC ejecutándose regularmente

### Performance
- Tiempo de respuesta < 200ms (p95)
- Cache hit rate > 70%
- Throughput > 1000 req/s

### Recursos
- CPU < 50% en promedio
- Conexiones DB < 50% del pool
- Rate limit violations < 1%

## Herramientas Recomendadas

### Monitoreo
- **Node.js built-in**: `process.memoryUsage()`
- **PM2**: Monitoreo de procesos
- **Clinic.js**: Diagnóstico de rendimiento
- **New Relic/DataDog**: Monitoreo en producción

### Testing
- **Artillery**: Load testing
- **Apache Bench**: Stress testing
- **autocannon**: Performance testing

### Debugging
- **Chrome DevTools**: Memory profiling
- **heapdump**: Análisis de heap
- **memwatch-next**: Detección de leaks

## Recursos Adicionales

- [Node.js Memory Management](https://nodejs.org/en/docs/guides/simple-profiling/)
- [V8 Garbage Collection](https://v8.dev/blog/trash-talk)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Redis Caching Strategies](https://redis.io/topics/lru-cache)

## Conclusión

La gestión eficiente de memoria es crucial para aplicaciones escalables y confiables. Siguiendo estas prácticas, garantizamos:

1. **Rendimiento óptimo** bajo carga
2. **Experiencia de usuario** consistente
3. **Costos de infraestructura** reducidos
4. **Estabilidad** a largo plazo
5. **Escalabilidad** horizontal y vertical

Recuerda: **La optimización prematura es la raíz de todos los males, pero la optimización informada es la raíz del éxito**.
