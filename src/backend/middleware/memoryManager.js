/**
 * Middleware para gestión de memoria
 * Implementa mejores prácticas para optimización de memoria
 */

const os = require('os');

// Cache en memoria con límite de tamaño
class MemoryCache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.hits = 0;
    this.misses = 0;
  }

  get(key) {
    if (this.cache.has(key)) {
      this.hits++;
      const item = this.cache.get(key);
      
      // Verificar expiración
      if (item.expiry && Date.now() > item.expiry) {
        this.cache.delete(key);
        this.misses++;
        return null;
      }
      
      return item.value;
    }
    this.misses++;
    return null;
  }

  set(key, value, ttl = 300000) { // TTL default: 5 minutos
    // Implementar LRU: si está lleno, eliminar el más antiguo
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      expiry: ttl ? Date.now() + ttl : null,
      timestamp: Date.now()
    });
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  getStats() {
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: this.hits / (this.hits + this.misses) || 0
    };
  }
}

// Instancia global de cache
const cache = new MemoryCache(100);

/**
 * Middleware para rastrear uso de memoria
 */
function trackMemoryUsage(req, res, next) {
  const start = Date.now();
  const startMemory = process.memoryUsage().heapUsed;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const endMemory = process.memoryUsage().heapUsed;
    const memoryDiff = endMemory - startMemory;

    // Log si el request usó mucha memoria
    if (memoryDiff > 10 * 1024 * 1024) { // > 10MB
      console.warn(`Request ${req.method} ${req.path} usó ${Math.round(memoryDiff / 1024 / 1024)}MB en ${duration}ms`);
    }
  });

  next();
}

/**
 * Middleware para limpiar cache cuando la memoria está baja
 */
function clearCacheOnLowMemory(req, res, next) {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemoryPercentage = ((totalMemory - freeMemory) / totalMemory) * 100;

  // Si el uso de memoria es > 85%, limpiar cache
  if (usedMemoryPercentage > 85) {
    console.warn(`Memoria del sistema al ${usedMemoryPercentage.toFixed(2)}%, limpiando cache...`);
    cache.clear();
    
    // Forzar garbage collection si está disponible
    if (global.gc) {
      global.gc();
    }
  }

  next();
}

/**
 * Middleware para pagination automática
 */
function autoPaginate(req, res, next) {
  // Valores por defecto para paginación
  req.pagination = {
    page: parseInt(req.query.page) || 1,
    limit: Math.min(parseInt(req.query.limit) || 20, 100), // Máximo 100 items
    offset: 0
  };

  req.pagination.offset = (req.pagination.page - 1) * req.pagination.limit;

  next();
}

/**
 * Helper para streaming de grandes datasets
 */
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
    
    // Liberar memoria procesando en chunks
    if (index % 100 === 0 && global.gc) {
      global.gc();
    }
  });

  res.write(']');
  res.end();
}

/**
 * Pool de conexiones para base de datos
 * Reutilización de conexiones para eficiencia de memoria
 * 
 * @class ConnectionPool
 * @description Gestiona un pool de conexiones reutilizables para optimizar memoria
 * @param {number} maxConnections - Número máximo de conexiones en el pool (default: 10)
 * 
 * @example
 * const pool = new ConnectionPool(10);
 * const conn = await pool.acquire();
 * // usar conexión
 * pool.release(conn);
 */
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
      // Aquí iría la lógica real de conexión
      return { id: this.activeConnections };
    }

    // Esperar a que se libere una conexión
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.connections.length > 0) {
          clearInterval(interval);
          resolve(this.connections.pop());
        }
      }, 100);
    });
  }

  release(connection) {
    if (this.connections.length < this.maxConnections) {
      this.connections.push(connection);
    } else {
      // Cerrar conexión si el pool está lleno
      this.activeConnections--;
    }
  }

  async close() {
    // Cerrar todas las conexiones
    this.connections = [];
    this.activeConnections = 0;
  }
}

const dbPool = new ConnectionPool(10);

module.exports = {
  cache,
  trackMemoryUsage,
  clearCacheOnLowMemory,
  autoPaginate,
  streamLargeData,
  ConnectionPool,
  dbPool
};
