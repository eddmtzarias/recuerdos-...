# Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto Recordador de Memoria Educativo! Este documento te guiará a través del proceso.

## Código de Conducta

Este proyecto sigue un código de conducta para crear un ambiente inclusivo y respetuoso:

- Sé respetuoso con otros colaboradores
- Acepta críticas constructivas
- Enfócate en lo mejor para la comunidad
- Muestra empatía hacia otros miembros

## ¿Cómo Puedo Contribuir?

### Reportar Bugs

Si encuentras un bug:

1. **Verifica** que no haya sido reportado ya en [Issues](https://github.com/eddmtzarias/recuerdos-.../issues)
2. **Crea un nuevo issue** con:
   - Título descriptivo
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Capturas de pantalla (si aplica)
   - Versión de Node.js y sistema operativo

**Ejemplo:**
```
Título: Error al crear recordatorio con fecha pasada

Descripción:
1. Ir a POST /api/reminders
2. Enviar fecha en el pasado
3. Ver error 500 en lugar de validación

Esperado: Error 400 con mensaje de validación
Actual: Error 500 Internal Server Error

Node: v18.0.0
SO: Ubuntu 22.04
```

### Sugerir Mejoras

Para sugerir nuevas funcionalidades:

1. **Abre un issue** con la etiqueta `enhancement`
2. **Describe**:
   - Problema que resuelve
   - Solución propuesta
   - Alternativas consideradas
   - Impacto en usuarios

### Pull Requests

#### Proceso

1. **Fork** el repositorio
2. **Crea una rama** desde `main`:
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   # o
   git checkout -b fix/corrección-de-bug
   ```

3. **Desarrolla** tu cambio:
   - Escribe código limpio y documentado
   - Sigue las convenciones del proyecto
   - Agrega tests si es posible
   - Actualiza documentación

4. **Commit** tus cambios:
   ```bash
   git commit -m "feat: agregar funcionalidad X"
   # o
   git commit -m "fix: corregir problema Y"
   ```

5. **Push** a tu fork:
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```

6. **Abre un Pull Request** en GitHub

#### Convenciones de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[footer opcional]
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato (sin cambios de código)
- `refactor`: Refactorización
- `test`: Agregar o modificar tests
- `chore`: Mantenimiento

**Ejemplos:**
```
feat(reminders): agregar soporte para recordatorios recurrentes
fix(auth): corregir validación de email en registro
docs(api): actualizar ejemplos de endpoints
refactor(cache): optimizar algoritmo LRU
```

## Estándares de Código

### JavaScript/Node.js

#### Estilo

```javascript
// ✅ Bueno
const myFunction = (param1, param2) => {
  const result = processData(param1);
  return result + param2;
};

// ❌ Malo
function myFunction(param1,param2){
  var result=processData(param1)
  return result+param2
}
```

#### Mejores Prácticas

1. **Usa const/let**, no var
2. **Arrow functions** para callbacks
3. **Async/await** en lugar de callbacks anidados
4. **Destructuring** cuando sea apropiado
5. **Template literals** para strings con variables

```javascript
// ✅ Bueno
const { title, description } = req.body;
const message = `Recordatorio: ${title}`;

// ❌ Malo
var title = req.body.title;
var description = req.body.description;
var message = 'Recordatorio: ' + title;
```

#### Nomenclatura

- **Variables/Funciones**: camelCase (`getUserData`)
- **Clases**: PascalCase (`MemoryCache`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_CONTENT_SIZE`)
- **Archivos**: kebab-case (`memory-manager.js`)

### Documentación

#### Comentarios JSDoc

```javascript
/**
 * Genera un resumen usando IA
 * @param {string} content - Contenido a resumir
 * @param {Object} options - Opciones de resumen
 * @param {string} options.length - Longitud del resumen (brief|detailed)
 * @returns {Promise<Object>} Resumen generado
 */
async function generateSummary(content, options) {
  // implementación
}
```

#### README de Funcionalidades

Para nuevas funcionalidades grandes, incluir:
- Descripción
- Casos de uso
- Ejemplos de código
- Consideraciones de rendimiento

### Tests

#### Estructura

```javascript
describe('MemoryCache', () => {
  describe('get()', () => {
    it('debería retornar valor cacheado', () => {
      const cache = new MemoryCache();
      cache.set('key', 'value');
      expect(cache.get('key')).toBe('value');
    });

    it('debería retornar null para clave inexistente', () => {
      const cache = new MemoryCache();
      expect(cache.get('nonexistent')).toBeNull();
    });
  });
});
```

#### Cobertura

Apuntar a:
- 80% cobertura mínima
- 100% para lógica crítica (auth, memoria)

### Performance

#### Gestión de Memoria

```javascript
// ✅ Bueno: Limitar tamaño
const cache = new MemoryCache(100);

// ❌ Malo: Sin límite
const cache = new Map();

// ✅ Bueno: Paginación
router.get('/', autoPaginate, async (req, res) => {
  const { limit, offset } = req.pagination;
  // ...
});

// ❌ Malo: Cargar todo
router.get('/', async (req, res) => {
  const all = await db.findAll();
  res.json(all);
});
```

#### Async/Await

```javascript
// ✅ Bueno: Manejo de errores
try {
  const result = await asyncOperation();
  res.json(result);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: error.message });
}

// ❌ Malo: Sin manejo
const result = await asyncOperation();
res.json(result);
```

## Checklist de PR

Antes de enviar tu PR, verifica:

- [ ] Código sigue las convenciones del proyecto
- [ ] Tests agregados/actualizados
- [ ] Tests pasan localmente
- [ ] Documentación actualizada
- [ ] Commit messages siguen convención
- [ ] Sin archivos innecesarios (node_modules, .env, etc.)
- [ ] Sin console.log de debug
- [ ] Sin TODOs pendientes críticos

## Revisión de Código

### Como Autor

- Responde a comentarios constructivamente
- Haz cambios solicitados rápidamente
- Marca conversaciones como resueltas

### Como Revisor

- Sé constructivo y específico
- Sugiere mejoras, no solo critiques
- Aprueba cuando esté listo

**Ejemplo de comentario constructivo:**
```
❌ "Este código está mal"
✅ "Considera usar Array.map() aquí para mejor legibilidad:
   const ids = users.map(u => u.id)"
```

## Estructura de Branches

```
main
  └── develop
       ├── feature/nueva-funcionalidad
       ├── fix/corrección-bug
       └── docs/actualizar-readme
```

- **main**: Código estable en producción
- **develop**: Desarrollo activo
- **feature/***: Nuevas funcionalidades
- **fix/***: Correcciones de bugs
- **docs/***: Cambios de documentación

## Recursos

### Documentación
- [Guía de instalación](SETUP.md)
- [Documentación API](API_DOCUMENTATION.md)
- [Guía UX](UX_DOCUMENTATION.md)
- [Optimización de memoria](MEMORY_OPTIMIZATION.md)

### Herramientas
- [Node.js docs](https://nodejs.org/docs/)
- [Express.js docs](https://expressjs.com/)
- [Jest testing](https://jestjs.io/)
- [ESLint](https://eslint.org/)

### Comunidad
- [Issues](https://github.com/eddmtzarias/recuerdos-.../issues)
- [Discussions](https://github.com/eddmtzarias/recuerdos-.../discussions)

## Preguntas Frecuentes

### ¿Cómo empiezo?

1. Lee esta guía completa
2. Configura el entorno local
3. Busca issues con etiqueta `good first issue`
4. Comenta en el issue que quieres trabajar en él
5. Desarrolla y envía tu PR

### ¿Cuánto tarda la revisión?

Generalmente 2-5 días laborables. Si ha pasado más tiempo, comenta en el PR.

### ¿Puedo trabajar en múltiples issues?

Sí, pero recomendamos enfocarte en uno a la vez para mejores resultados.

### ¿Necesito experiencia previa?

No para issues marcados como `good first issue`. ¡Todos empezamos en algún lugar!

## Reconocimientos

Los colaboradores son reconocidos en:
- README.md
- Releases notes
- Contributors page de GitHub

## Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la licencia MIT del proyecto.

---

¡Gracias por contribuir a hacer la educación más accesible! 🎓✨
