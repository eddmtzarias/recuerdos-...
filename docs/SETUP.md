# Guía de Instalación y Configuración

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v18 o superior ([Descargar](https://nodejs.org/))
- **npm** (incluido con Node.js) o **yarn**
- **Git** para clonar el repositorio

## Instalación Paso a Paso

### 1. Clonar el Repositorio

```bash
git clone https://github.com/eddmtzarias/recuerdos-....git
cd recuerdos-...
```

### 2. Instalar Dependencias del Backend

```bash
cd src/backend
npm install
```

Esto instalará:
- Express.js (framework web)
- Helmet (seguridad)
- CORS (manejo de peticiones cross-origin)
- Compression (compresión de respuestas)
- Express-rate-limit (rate limiting)

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```bash
nano .env
# o usa tu editor favorito
```

**Configuración mínima para desarrollo:**
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=cambiar_en_produccion_por_algo_seguro
```

### 4. Iniciar el Servidor

**Modo desarrollo (con hot-reload):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

### 5. Verificar la Instalación

Abre tu navegador o usa curl:

```bash
curl http://localhost:3000/health
```

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2024-12-13T...",
  "memory": {
    "rss": "45MB",
    "heapUsed": "32MB",
    "heapTotal": "40MB"
  }
}
```

## Configuración Opcional

### Base de Datos (PostgreSQL)

Si quieres usar una base de datos real en lugar de simulaciones:

1. **Instalar PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   
   # macOS
   brew install postgresql
   ```

2. **Crear base de datos**
   ```bash
   psql -U postgres
   CREATE DATABASE recuerdos_educativo;
   \q
   ```

3. **Configurar en .env**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=recuerdos_educativo
   DB_USER=postgres
   DB_PASSWORD=tu_password
   ```

### Redis (Caché)

Para mejorar el rendimiento con caché persistente:

1. **Instalar Redis**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install redis-server
   
   # macOS
   brew install redis
   ```

2. **Iniciar Redis**
   ```bash
   redis-server
   ```

3. **Configurar en .env**
   ```env
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

### OpenAI API (Resúmenes con IA)

Para usar generación de resúmenes real:

1. **Obtener API Key**
   - Registrarse en [OpenAI](https://platform.openai.com/)
   - Crear una API Key

2. **Configurar en .env**
   ```env
   OPENAI_API_KEY=sk-...tu_api_key
   ```

## Desarrollo

### Estructura de Carpetas

```
src/backend/
├── app.js                    # Aplicación principal
├── middleware/
│   └── memoryManager.js     # Gestión de memoria
├── routes/
│   ├── auth.js             # Autenticación
│   ├── reminders.js        # Recordatorios
│   ├── summaries.js        # Resúmenes IA
│   └── users.js            # Usuarios
├── package.json
├── .env.example
└── .env                    # Crear este archivo
```

### Scripts Disponibles

```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start

# Tests (cuando estén implementados)
npm test

# Linting
npm run lint
```

### Agregar Nuevas Rutas

1. Crear archivo en `routes/`:
   ```javascript
   // routes/mi-ruta.js
   const express = require('express');
   const router = express.Router();
   
   router.get('/', (req, res) => {
     res.json({ message: 'Mi nueva ruta' });
   });
   
   module.exports = router;
   ```

2. Registrar en `app.js`:
   ```javascript
   const miRutaRouter = require('./routes/mi-ruta');
   app.use('/api/mi-ruta', miRutaRouter);
   ```

## Testing

### Probar Endpoints con curl

**Crear recordatorio:**
```bash
curl -X POST http://localhost:3000/api/reminders \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudiar Matemáticas",
    "subject": "Matemáticas",
    "dueDate": "2024-12-20T10:00:00Z",
    "priority": "high"
  }'
```

**Listar recordatorios:**
```bash
curl http://localhost:3000/api/reminders
```

**Generar resumen:**
```bash
curl -X POST http://localhost:3000/api/summaries/generate \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Texto largo para resumir...",
    "options": {
      "length": "brief",
      "includeKeyPoints": true
    }
  }'
```

### Probar con Postman

1. Importar colección de endpoints
2. Configurar variables de entorno
3. Ejecutar requests

## Deployment

### Heroku

```bash
# Login
heroku login

# Crear app
heroku create recuerdos-educativo

# Configurar variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=tu_secret_seguro

# Deploy
git push heroku main
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

```bash
# Build
docker build -t recuerdos-educativo .

# Run
docker run -p 3000:3000 recuerdos-educativo
```

### VPS (Ubuntu/Debian)

```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar y configurar
git clone https://github.com/eddmtzarias/recuerdos-....git
cd recuerdos-.../src/backend
npm install
npm start

# Usar PM2 para proceso persistente
sudo npm install -g pm2
pm2 start app.js --name recuerdos-educativo
pm2 startup
pm2 save
```

## Troubleshooting

### Puerto ya en uso

```bash
# Encontrar proceso
lsof -i :3000

# Matar proceso
kill -9 <PID>

# O cambiar puerto en .env
PORT=3001
```

### Error de módulos

```bash
# Limpiar cache e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
```

### Memoria insuficiente

```bash
# Aumentar límite de memoria de Node.js
node --max-old-space-size=4096 app.js
```

## Próximos Pasos

1. **Implementar frontend**: React, Vue.js o Angular
2. **Agregar tests**: Jest, Mocha o similar
3. **CI/CD**: GitHub Actions, GitLab CI
4. **Monitoreo**: New Relic, DataDog o Prometheus
5. **Documentación API**: Swagger/OpenAPI

## Recursos

- [Documentación del proyecto](../docs/PROYECTO.md)
- [Documentación API](../docs/API_DOCUMENTATION.md)
- [Guía UX](../docs/UX_DOCUMENTATION.md)
- [Optimización de memoria](../docs/MEMORY_OPTIMIZATION.md)

## Soporte

Si encuentras problemas:
1. Revisa esta guía
2. Consulta la documentación
3. Abre un issue en GitHub
4. Contacta al equipo de desarrollo

---

¡Feliz desarrollo! 🚀
