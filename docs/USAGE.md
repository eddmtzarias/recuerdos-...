# Documentación de ECLOPROYEC

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [Uso Básico](#uso-básico)
4. [API Reference](#api-reference)
5. [Ejemplos Avanzados](#ejemplos-avanzados)
6. [Mejores Prácticas](#mejores-prácticas)

## Introducción

ECLOPROYEC es un sistema para crear prompts estructurados usando el método C.R.A.F.T. (Contexto, Rol, Acciones, Formato, Target). Este método ayuda a generar prompts más efectivos para modelos de lenguaje como ChatGPT.

### ¿Por qué usar el método C.R.A.F.T.?

- **Estructura clara**: Organiza tus ideas de manera sistemática
- **Resultados consistentes**: Los LLMs responden mejor a prompts estructurados
- **Reusabilidad**: Los prompts son fáciles de modificar y adaptar
- **Documentación**: El formato es autodocumentado y fácil de entender

## Instalación

### Requisitos Previos

- Python 3.8 o superior
- pip

### Instalación desde el repositorio

```bash
git clone https://github.com/eddmtzarias/ECLOPROYEC.git
cd ECLOPROYEC
pip install -r requirements.txt
```

### Verificar la instalación

```bash
python -m pytest tests/
```

## Uso Básico

### Crear un prompt simple

```python
from src.prompt_craft import crear_prompt_craft, validar_prompt

# Definir componentes
contexto = "Crear una guía de Python para principiantes"
rol = "Instructor experimentado en programación"
acciones = [
    "Explicar conceptos básicos",
    "Proporcionar ejemplos",
    "Añadir ejercicios"
]
formato = "Tutorial estructurado en Markdown"
publico = "Estudiantes sin experiencia previa"

# Crear el prompt
prompt = crear_prompt_craft(contexto, rol, acciones, formato, publico)

# Validar
if validar_prompt(prompt):
    print("✓ Prompt válido")
    print(prompt)
```

### Ejecutar el ejemplo de uso

```bash
python examples/ejemplo_uso.py
```

### Usar el notebook interactivo

```bash
jupyter notebook examples/tutorial_craft.ipynb
```

## API Reference

### `crear_prompt_craft(contexto, rol, acciones, formato, publico_objetivo)`

Crea un prompt estructurado usando el método C.R.A.F.T.

**Parámetros:**
- `contexto` (str): Descripción de la situación y propósito
- `rol` (str): Tipo de experiencia y especialización requerida
- `acciones` (list): Lista de acciones secuenciales a realizar
- `formato` (str): Estructura deseada del resultado
- `publico_objetivo` (str): Descripción del destinatario

**Retorna:**
- str: Prompt formateado con todos los componentes C.R.A.F.T.

**Ejemplo:**
```python
prompt = crear_prompt_craft(
    contexto="Escribir un artículo sobre IA",
    rol="Periodista especializado en tecnología",
    acciones=["Investigar", "Redactar", "Revisar"],
    formato="Artículo de 1000 palabras",
    publico_objetivo="Público general"
)
```

### `validar_prompt(prompt)`

Valida que un prompt contenga todos los elementos necesarios del método C.R.A.F.T.

**Parámetros:**
- `prompt` (str): El prompt a validar

**Retorna:**
- bool: True si el prompt es válido, False en caso contrario

**Ejemplo:**
```python
es_valido = validar_prompt(prompt)
if not es_valido:
    print("El prompt no contiene todos los elementos requeridos")
```

## Ejemplos Avanzados

### Prompt para Análisis Técnico

```python
prompt_tecnico = crear_prompt_craft(
    contexto="""
    Analizar la arquitectura de un sistema distribuido de e-commerce
    que maneja 1 millón de transacciones diarias
    """,
    rol="""
    Eres un arquitecto de software senior con 20+ años de experiencia
    en sistemas distribuidos, microservicios y arquitecturas escalables
    """,
    acciones=[
        "Identificar componentes principales del sistema",
        "Evaluar patrones de arquitectura utilizados",
        "Analizar estrategias de escalabilidad y resiliencia",
        "Identificar posibles puntos de falla",
        "Proponer mejoras y optimizaciones",
        "Documentar decisiones arquitectónicas clave"
    ],
    formato="""
    Informe técnico detallado con:
    - Diagramas de arquitectura (en formato Mermaid o PlantUML)
    - Análisis de cada componente
    - Tabla de riesgos y mitigaciones
    - Recomendaciones priorizadas
    """,
    publico_objetivo="""
    Equipo técnico senior (arquitectos, tech leads, DevOps)
    con experiencia en sistemas distribuidos
    """
)
```

### Prompt para Contenido Creativo

```python
prompt_marketing = crear_prompt_craft(
    contexto="Desarrollar una campaña de contenidos para lanzamiento de producto",
    rol="Director creativo con experiencia en marketing digital y storytelling",
    acciones=[
        "Definir la propuesta de valor única del producto",
        "Crear narrativa de marca coherente",
        "Desarrollar copy para diferentes canales",
        "Diseñar estrategia de engagement",
        "Establecer métricas de éxito"
    ],
    formato="Plan de campaña con calendario, copy y KPIs",
    publico_objetivo="Millennials y Gen Z interesados en tecnología"
)
```

## Mejores Prácticas

### 1. Contexto Claro y Específico

❌ Malo:
```python
contexto = "Hacer algo con datos"
```

✅ Bueno:
```python
contexto = """
Analizar dataset de ventas de los últimos 5 años para identificar
tendencias estacionales y predecir demanda del próximo trimestre
"""
```

### 2. Rol con Experiencia Relevante

❌ Malo:
```python
rol = "Experto"
```

✅ Bueno:
```python
rol = """
Eres un científico de datos con 15 años de experiencia en
análisis predictivo y forecasting para retail
"""
```

### 3. Acciones Secuenciales y Específicas

❌ Malo:
```python
acciones = ["Analizar", "Hacer algo", "Terminar"]
```

✅ Bueno:
```python
acciones = [
    "Realizar análisis exploratorio de datos (EDA)",
    "Identificar variables correlacionadas con ventas",
    "Aplicar modelos de series temporales (ARIMA, Prophet)",
    "Validar predicciones con datos históricos",
    "Presentar resultados con visualizaciones claras"
]
```

### 4. Formato Apropiado al Caso de Uso

- **Reportes**: Documento estructurado con secciones
- **Código**: Scripts comentados o notebooks
- **Análisis**: Tablas, gráficos y conclusiones
- **Tutoriales**: Paso a paso con ejemplos
- **Documentación**: API reference, guías de usuario

### 5. Público Objetivo Bien Definido

Incluye:
- Nivel de experiencia
- Conocimientos previos esperados
- Contexto profesional
- Objetivos y necesidades

## Recursos Adicionales

- [README.md](../README.md) - Información general del proyecto
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Guía de contribución
- [examples/](../examples/) - Ejemplos prácticos
- [tests/](../tests/) - Suite de tests

## Soporte

Si encuentras problemas o tienes preguntas:
1. Revisa la documentación
2. Busca en Issues existentes
3. Crea un nuevo Issue con detalles
