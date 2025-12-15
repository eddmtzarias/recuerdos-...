# Documentación UX/UI - Recordador de Memoria Educativo

## 1. Principios de Diseño

### 1.1 Accesibilidad
- Diseño inclusivo para usuarios con diferentes capacidades
- Soporte para lectores de pantalla
- Alto contraste y tipografía legible
- Navegación por teclado

### 1.2 Simplicidad
- Interface limpia y minimalista
- Flujos de trabajo intuitivos
- Información jerárquica clara
- Reducción de pasos para tareas comunes

### 1.3 Consistencia
- Patrones de diseño consistentes
- Colores y tipografía uniforme
- Comportamientos predecibles
- Lenguaje claro y coherente

## 2. Flujos de Usuario

### 2.1 Flujo de Onboarding

```
[Inicio] → [Registro] → [Perfil] → [Tutorial] → [Dashboard]
```

**Pasos detallados:**
1. Usuario abre la aplicación
2. Pantalla de bienvenida con opciones de registro/login
3. Formulario de registro (nombre, email, nivel educativo)
4. Configuración de perfil (materias de interés, horarios de estudio)
5. Tutorial interactivo (opcional, puede saltarse)
6. Dashboard principal con recordatorios vacío y CTA para crear primero

### 2.2 Flujo de Creación de Recordatorio

```
[Dashboard] → [Nuevo Recordatorio] → [Formulario] → [Confirmación] → [Dashboard Actualizado]
```

**Campos del formulario:**
- Título del recordatorio
- Descripción (opcional)
- Materia/Categoría
- Fecha y hora
- Prioridad (alta, media, baja)
- Repetición (única, diaria, semanal)
- Notas adicionales

### 2.3 Flujo de Generación de Resumen

```
[Dashboard] → [Subir Contenido] → [Procesamiento IA] → [Vista Previa Resumen] → [Guardar/Editar]
```

**Proceso:**
1. Usuario hace clic en "Generar Resumen"
2. Opciones: subir archivo (PDF, DOCX) o pegar texto
3. Sistema procesa con IA (indicador de progreso)
4. Muestra resumen generado con opción de editar
5. Usuario puede guardar, compartir o vincular a recordatorio

### 2.4 Flujo de Notificaciones

```
[Notificación Push/Email] → [Click] → [Detalle del Recordatorio] → [Marcar Completado]
```

## 3. Wireframes y Layouts

### 3.1 Dashboard Principal

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Recordador Educativo        [Perfil] [Notificaciones]│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Hoy - Viernes, 13 Diciembre 2024                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 📚 Tarea de Matemáticas              [✓ Completar] │    │
│  │ Resolver ejercicios 1-20                           │    │
│  │ ⏰ 16:00 PM  |  🏷️ Alta prioridad                   │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 📖 Leer capítulo 5                   [✓ Completar] │    │
│  │ Historia: Revolución Industrial                     │    │
│  │ ⏰ 18:30 PM  |  🏷️ Media prioridad                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  [+ Nuevo Recordatorio]  [📝 Generar Resumen]              │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ [🏠 Inicio] [📅 Calendario] [📊 Progreso] [⚙️ Ajustes]     │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Vista de Creación de Recordatorio

```
┌─────────────────────────────────────────────────────────────┐
│ [← Atrás] Nuevo Recordatorio                       [Guardar]│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Título *                                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │ [Ingresa el título del recordatorio...]            │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Descripción                                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │ [Detalles opcionales...]                           │    │
│  │                                                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Materia                    Prioridad                        │
│  [▼ Matemáticas]           [○ Alta ● Media ○ Baja]         │
│                                                              │
│  Fecha y Hora                                                │
│  [📅 13/12/2024]  [⏰ 16:00]                                │
│                                                              │
│  Repetir                                                     │
│  [▼ No repetir]                                             │
│                                                              │
│  [Cancelar]                              [Guardar]          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Vista de Generación de Resumen

```
┌─────────────────────────────────────────────────────────────┐
│ [← Atrás] Generar Resumen IA                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Selecciona el contenido a resumir:                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │        [📁 Subir Archivo]                          │    │
│  │                                                     │    │
│  │            o                                        │    │
│  │                                                     │    │
│  │        [📝 Pegar Texto]                            │    │
│  │                                                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Opciones avanzadas:                                         │
│  ☑ Resumen breve (200 palabras)                             │
│  ☐ Resumen detallado (500 palabras)                         │
│  ☑ Incluir puntos clave                                     │
│  ☑ Generar preguntas de estudio                             │
│                                                              │
│  [Cancelar]                              [Generar Resumen]  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 4. Paleta de Colores

```
Primario:   #3B82F6  (Azul - Confianza, Educación)
Secundario: #10B981  (Verde - Éxito, Completado)
Acento:     #F59E0B  (Ámbar - Alerta, Importante)
Error:      #EF4444  (Rojo - Errores, Urgente)
Fondo:      #F9FAFB  (Gris claro)
Texto:      #1F2937  (Gris oscuro)
```

## 5. Tipografía

- **Títulos**: Inter Bold, 24-32px
- **Subtítulos**: Inter SemiBold, 18-20px
- **Cuerpo**: Inter Regular, 14-16px
- **Captions**: Inter Regular, 12-14px

## 6. Componentes Reutilizables

### 6.1 Tarjeta de Recordatorio
- Estados: pendiente, completado, vencido
- Acciones: completar, editar, eliminar, posponer

### 6.2 Botón de Acción
- Variantes: primario, secundario, texto
- Estados: normal, hover, activo, deshabilitado

### 6.3 Modal de Confirmación
- Título, mensaje, acciones (confirmar/cancelar)

### 6.4 Indicador de Progreso
- Barra de progreso lineal
- Spinner circular para carga

### 6.5 Notificación Toast
- Tipos: éxito, error, información, advertencia
- Auto-desaparece después de 3-5 segundos

## 7. Responsive Design

### Breakpoints:
- **Móvil**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Adaptaciones:
- Móvil: navegación inferior, vista de lista
- Tablet: sidebar plegable, vista de lista/grid
- Desktop: sidebar fijo, vista de grid con detalles

## 8. Animaciones y Transiciones

- **Transiciones**: 150-300ms ease-in-out
- **Animaciones de entrada**: fade-in, slide-in
- **Micro-interacciones**: hover effects, ripple effects
- **Loading states**: skeleton screens, spinners

## 9. Accesibilidad (WCAG 2.1 Level AA)

- Contraste mínimo 4.5:1 para texto normal
- Tamaño mínimo de touch targets: 44x44px
- Labels descriptivos para todos los inputs
- Navegación por teclado completa
- Mensajes de error claros y descriptivos
- Soporte para modo oscuro (opcional)

## 10. Métricas UX

- **Time on Task**: < 30 segundos para crear recordatorio
- **Error Rate**: < 5% de errores de usuario
- **Task Success Rate**: > 95%
- **System Usability Scale (SUS)**: > 80
