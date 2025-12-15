# Recordador de Memoria Educativo con IA 🎓

Sistema inteligente de recordatorios y gestión de memoria para estudiantes, diseñado con las mejores prácticas de manejo de memoria y optimización de recursos.

## 📋 Índice

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [API](#api)
- [Documentación](#documentación)
- [Plantillas](#plantillas)
- [Mejores Prácticas](#mejores-prácticas)
- [Contribuir](#contribuir)

## ✨ Características

### Funcionalidades Principales

- **Recordatorios Inteligentes**: Sistema de recordatorios con prioridades, repeticiones y notificaciones
- **Generación de Resúmenes con IA**: Procesamiento automático de contenido educativo
- **Gestión de Tiempo**: Planificación y organización de horarios de estudio
- **Estadísticas y Progreso**: Seguimiento detallado del avance académico
- **Multi-materia**: Soporte para múltiples asignaturas y niveles educativos

### Optimizaciones de Memoria

- ✅ **Caché inteligente con LRU** (Least Recently Used)
- ✅ **Paginación automática** para grandes conjuntos de datos
- ✅ **Pool de conexiones** a base de datos
- ✅ **Streaming** para grandes volúmenes de datos
- ✅ **Compresión** de respuestas HTTP
- ✅ **Rate limiting** para prevenir abuso
- ✅ **Garbage collection** automático
- ✅ **Monitoreo** de uso de memoria en tiempo real

## 📁 Estructura del Proyecto

```
recuerdos-.../
├── docs/
│   ├── PROYECTO.md              # Definición completa del proyecto
│   ├── UX_DOCUMENTATION.md      # Documentación de UX/UI
│   └── API_DOCUMENTATION.md     # Documentación de la API
├── src/
│   ├── backend/
│   │   ├── app.js              # Aplicación principal Express
│   │   ├── middleware/
│   │   │   └── memoryManager.js # Gestión de memoria
│   │   ├── routes/
│   │   │   ├── auth.js         # Autenticación
│   │   │   ├── reminders.js    # Recordatorios
│   │   │   ├── summaries.js    # Resúmenes IA
│   │   │   └── users.js        # Usuarios
│   │   └── package.json
│   └── frontend/               # [Por implementar]
├── templates/
│   ├── recordatorio_tarea.md   # Plantilla de tarea
│   ├── plan_estudio_semanal.md # Plantilla de plan semanal
│   └── resumen_contenido.md    # Plantilla de resumen
├── .gitignore
└── README.md
```

## 🛠 Tecnologías

### Backend
- **Node.js** v18+ con Express
- **Gestión de memoria** personalizada
- **Rate limiting** con express-rate-limit
- **Seguridad** con Helmet
- **Compresión** con compression

### Recomendado para Producción
- **Base de datos**: PostgreSQL o MongoDB
- **Cache**: Redis
- **IA**: OpenAI API o Hugging Face
- **Hosting**: AWS, Google Cloud o Azure

## 🚀 Instalación

### Prerrequisitos
- Node.js v18 o superior
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/eddmtzarias/recuerdos-....git
   cd recuerdos-...
   ```

2. **Instalar dependencias del backend**
   ```bash
   cd src/backend
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

4. **Iniciar el servidor**
   ```bash
   npm start
   # o para desarrollo con hot-reload:
   npm run dev
   ```

El servidor estará disponible en `http://localhost:3000`

## 💻 Uso

### Verificar estado del servidor

```bash
curl http://localhost:3000/health
```

### Crear un recordatorio

```bash
curl -X POST http://localhost:3000/api/reminders \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudiar Matemáticas",
    "description": "Capítulo 5: Álgebra",
    "subject": "Matemáticas",
    "dueDate": "2024-12-20T10:00:00Z",
    "priority": "high"
  }'
```

### Generar resumen con IA

```bash
curl -X POST http://localhost:3000/api/summaries/generate \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Texto largo a resumir...",
    "options": {
      "length": "brief",
      "includeKeyPoints": true
    }
  }'
```

## 📚 API

La API REST está completamente documentada en [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md)

### Endpoints Principales

- **Autenticación**
  - `POST /api/auth/register` - Registrar usuario
  - `POST /api/auth/login` - Iniciar sesión
  - `GET /api/auth/me` - Obtener perfil

- **Recordatorios**
  - `GET /api/reminders` - Listar recordatorios
  - `POST /api/reminders` - Crear recordatorio
  - `PUT /api/reminders/:id` - Actualizar recordatorio
  - `DELETE /api/reminders/:id` - Eliminar recordatorio
  - `PATCH /api/reminders/:id/complete` - Marcar completado

- **Resúmenes IA**
  - `POST /api/summaries/generate` - Generar resumen
  - `GET /api/summaries` - Listar resúmenes
  - `GET /api/summaries/:id` - Obtener resumen

- **Usuarios**
  - `GET /api/users/:id` - Obtener perfil
  - `PUT /api/users/:id` - Actualizar perfil
  - `GET /api/users/:id/stats` - Estadísticas

## 📖 Documentación

- **[PROYECTO.md](docs/PROYECTO.md)**: Definición completa del proyecto, objetivos, audiencia y arquitectura
- **[UX_DOCUMENTATION.md](docs/UX_DOCUMENTATION.md)**: Guía de diseño UX/UI, wireframes y flujos
- **[API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)**: Referencia completa de la API REST

## 📝 Plantillas

El proyecto incluye plantillas predefinidas para facilitar el uso:

### 1. Recordatorio de Tarea
Plantilla completa para crear recordatorios de tareas académicas.
- Ver: [`templates/recordatorio_tarea.md`](templates/recordatorio_tarea.md)

### 2. Plan de Estudio Semanal
Organiza tu semana de estudio con esta plantilla detallada.
- Ver: [`templates/plan_estudio_semanal.md`](templates/plan_estudio_semanal.md)

### 3. Resumen de Contenido
Genera resúmenes estructurados de material educativo.
- Ver: [`templates/resumen_contenido.md`](templates/resumen_contenido.md)

## 🎯 Mejores Prácticas Implementadas

### Gestión de Memoria

1. **Caché con límite de tamaño**: Implementación LRU para evitar crecimiento descontrolado
2. **TTL (Time To Live)**: Expiración automática de datos cacheados
3. **Paginación obligatoria**: Límite máximo de 100 items por request
4. **Compresión automática**: Reduce el tamaño de las respuestas
5. **Monitoreo continuo**: Tracking de uso de memoria por request
6. **Limpieza automática**: Cache se limpia cuando memoria del sistema > 85%

### Seguridad

- Helmet para headers HTTP seguros
- Rate limiting (100 requests/15min)
- Validación de entrada
- Límites de tamaño de payload

### Performance

- Pool de conexiones a base de datos
- Streaming para grandes datasets
- Garbage collection periódico
- Respuestas comprimidas

## 🎓 Audiencia

Este sistema está diseñado para:

- **Estudiantes de nivel básico**: Organización de tareas simples
- **Estudiantes de bachillerato**: Gestión avanzada de proyectos
- **Estudiantes universitarios**: Múltiples materias y plazos
- **Profesionales en formación**: Balance trabajo-estudio

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- Proyecto educativo desarrollado con enfoque en mejores prácticas

## 🙏 Agradecimientos

- Comunidad educativa por feedback
- Contribuidores del proyecto
- Bibliotecas y frameworks de código abierto utilizados

---

**Nota**: Este es un proyecto educativo diseñado para enseñar mejores prácticas de desarrollo, gestión de memoria y arquitectura de sistemas.
