# API Documentation - Recordador de Memoria Educativo

## Base URL

```
http://localhost:3000/api
```

## Autenticación

La mayoría de los endpoints requieren autenticación mediante token JWT.

```http
Authorization: Bearer <token>
```

---

## Endpoints

### Autenticación

#### POST /auth/register
Registrar un nuevo usuario.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "securepassword123",
  "educationLevel": "university"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "educationLevel": "university",
      "createdAt": "2024-12-13T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /auth/login
Iniciar sesión.

**Request Body:**
```json
{
  "email": "juan@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Recordatorios

#### GET /reminders
Obtener todos los recordatorios del usuario autenticado.

**Query Parameters:**
- `page` (optional): Número de página (default: 1)
- `limit` (optional): Items por página (default: 20, max: 100)

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "userId": 1,
      "title": "Tarea de Matemáticas",
      "description": "Resolver ejercicios 1-20 del libro",
      "subject": "Matemáticas",
      "dueDate": "2024-12-14T16:00:00Z",
      "priority": "high",
      "completed": false
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 25
  },
  "cached": false
}
```

#### GET /reminders/:id
Obtener un recordatorio específico.

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "userId": 1,
    "title": "Tarea de Matemáticas",
    "description": "Resolver ejercicios 1-20 del libro",
    "subject": "Matemáticas",
    "dueDate": "2024-12-14T16:00:00Z",
    "priority": "high",
    "completed": false,
    "createdAt": "2024-12-13T10:00:00Z"
  },
  "cached": false
}
```

#### POST /reminders
Crear un nuevo recordatorio.

**Request Body:**
```json
{
  "title": "Estudiar para examen",
  "description": "Capítulos 5-8 de Historia",
  "subject": "Historia",
  "dueDate": "2024-12-20T10:00:00Z",
  "priority": "high",
  "repeat": "none"
}
```

**Response (201):**
```json
{
  "message": "Recordatorio creado exitosamente",
  "data": {
    "id": 2,
    "userId": 1,
    "title": "Estudiar para examen",
    "description": "Capítulos 5-8 de Historia",
    "subject": "Historia",
    "dueDate": "2024-12-20T10:00:00Z",
    "priority": "high",
    "repeat": "none",
    "completed": false,
    "createdAt": "2024-12-13T10:00:00Z"
  }
}
```

#### PUT /reminders/:id
Actualizar un recordatorio.

**Request Body:**
```json
{
  "title": "Estudiar para examen final",
  "priority": "high"
}
```

**Response (200):**
```json
{
  "message": "Recordatorio actualizado exitosamente",
  "data": {
    "id": 2,
    "userId": 1,
    "title": "Estudiar para examen final",
    "priority": "high",
    "updatedAt": "2024-12-13T11:00:00Z"
  }
}
```

#### DELETE /reminders/:id
Eliminar un recordatorio.

**Response (200):**
```json
{
  "message": "Recordatorio eliminado exitosamente",
  "id": 2
}
```

#### PATCH /reminders/:id/complete
Marcar un recordatorio como completado.

**Response (200):**
```json
{
  "message": "Recordatorio marcado como completado",
  "data": {
    "id": 1,
    "userId": 1,
    "completed": true,
    "completedAt": "2024-12-13T12:00:00Z"
  }
}
```

---

### Resúmenes con IA

#### POST /summaries/generate
Generar un resumen automático usando IA.

**Request Body:**
```json
{
  "content": "La Revolución Industrial fue un período de grandes cambios...",
  "options": {
    "length": "brief",
    "includeKeyPoints": true,
    "generateQuestions": true
  }
}
```

**Response (200):**
```json
{
  "data": {
    "original": {
      "length": 5000,
      "words": 850
    },
    "summary": {
      "text": "La Revolución Industrial transformó...",
      "length": 500,
      "words": 85
    },
    "keyPoints": [
      "La Revolución Industrial comenzó en Inglaterra",
      "Transformó la economía de agrícola a industrial",
      "Introdujo nuevas tecnologías"
    ],
    "studyQuestions": [
      "¿Cuál es la idea principal del texto?",
      "¿Qué conceptos clave se mencionan?"
    ]
  },
  "cached": false
}
```

#### GET /summaries
Obtener todos los resúmenes del usuario.

**Query Parameters:**
- `page` (optional): Número de página
- `limit` (optional): Items por página

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "userId": 1,
      "title": "Resumen: Revolución Industrial",
      "summaryLength": 500,
      "createdAt": "2024-12-13T10:00:00Z"
    }
  ],
  "cached": false
}
```

#### GET /summaries/:id
Obtener un resumen específico.

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "userId": 1,
    "title": "Resumen: Revolución Industrial",
    "originalLength": 5000,
    "summaryLength": 500,
    "keyPoints": [
      "Punto clave 1",
      "Punto clave 2"
    ],
    "fullSummary": "La Revolución Industrial fue...",
    "createdAt": "2024-12-13T10:00:00Z"
  },
  "cached": false
}
```

---

### Usuarios

#### GET /users/:id
Obtener perfil de usuario.

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "educationLevel": "university",
    "subjects": ["Matemáticas", "Historia", "Ciencias"],
    "joinedAt": "2024-01-01T00:00:00Z"
  },
  "cached": false
}
```

#### PUT /users/:id
Actualizar perfil de usuario.

**Request Body:**
```json
{
  "name": "Juan Pérez Actualizado",
  "subjects": ["Matemáticas", "Historia", "Ciencias", "Programación"]
}
```

**Response (200):**
```json
{
  "message": "Perfil actualizado exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Pérez Actualizado",
    "subjects": ["Matemáticas", "Historia", "Ciencias", "Programación"],
    "updatedAt": "2024-12-13T12:00:00Z"
  }
}
```

#### GET /users/:id/stats
Obtener estadísticas del usuario.

**Response (200):**
```json
{
  "data": {
    "userId": 1,
    "reminders": {
      "total": 25,
      "completed": 18,
      "pending": 7,
      "completionRate": 72
    },
    "summaries": {
      "total": 12,
      "averageLength": 450
    },
    "studyTime": {
      "thisWeek": 15.5,
      "thisMonth": 62,
      "trend": "up"
    },
    "subjects": [
      {
        "name": "Matemáticas",
        "count": 10,
        "progress": 80
      }
    ]
  },
  "cached": false
}
```

---

## Códigos de Error

- `400 Bad Request`: Datos de entrada inválidos
- `401 Unauthorized`: Token no válido o ausente
- `404 Not Found`: Recurso no encontrado
- `429 Too Many Requests`: Límite de rate excedido
- `500 Internal Server Error`: Error del servidor

**Ejemplo de respuesta de error:**
```json
{
  "error": {
    "message": "Los campos title y dueDate son requeridos",
    "status": 400
  }
}
```

---

## Rate Limiting

- **Límite**: 100 requests por 15 minutos por IP
- **Headers de respuesta**:
  - `X-RateLimit-Limit`: Límite total
  - `X-RateLimit-Remaining`: Requests restantes
  - `X-RateLimit-Reset`: Timestamp de reset

---

## Caché

Muchos endpoints implementan caché para optimizar el rendimiento:
- Los GET requests pueden devolver datos cacheados (indicado en el campo `cached`)
- Los POST/PUT/DELETE invalidan automáticamente los caches relacionados
- TTL típico: 5-10 minutos

---

## Health Check

#### GET /health

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-12-13T10:00:00Z",
  "memory": {
    "rss": "45MB",
    "heapUsed": "32MB",
    "heapTotal": "40MB"
  }
}
```
