#!/usr/bin/env python3
"""
Ejemplo de uso del módulo ECLOPROYEC

Este script demuestra cómo usar las funciones principales del proyecto
para crear prompts estructurados usando el método C.R.A.F.T.
"""

import sys
import os

# Añadir el directorio src al path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from prompt_craft import crear_prompt_craft, validar_prompt


def ejemplo_basico():
    """Ejemplo básico de creación de un prompt C.R.A.F.T."""
    print("=" * 80)
    print("EJEMPLO 1: Prompt básico para crear contenido educativo")
    print("=" * 80)
    
    prompt = crear_prompt_craft(
        contexto="Necesitas crear material educativo sobre Python para principiantes",
        rol="Eres un instructor de programación con más de 20 años de experiencia enseñando Python a principiantes",
        acciones=[
            "Explica los conceptos básicos de Python de manera clara y accesible",
            "Proporciona ejemplos prácticos que los estudiantes puedan ejecutar",
            "Incluye ejercicios progresivos del más simple al más complejo",
            "Añade consejos para evitar errores comunes"
        ],
        formato="Documento estructurado en Markdown con secciones claras",
        publico_objetivo="Estudiantes principiantes sin experiencia previa en programación, de 18-35 años"
    )
    
    print(prompt)
    print(f"\n✓ Prompt válido: {validar_prompt(prompt)}")


def ejemplo_productividad():
    """Ejemplo de prompt para coaching de productividad."""
    print("\n" + "=" * 80)
    print("EJEMPLO 2: Prompt para coaching de productividad")
    print("=" * 80)
    
    prompt = crear_prompt_craft(
        contexto="Crear una estrategia personalizada de gestión del tiempo para profesionales ocupados",
        rol="Eres un coach ejecutivo especializado en productividad y gestión del tiempo con certificaciones internacionales",
        acciones=[
            "Analiza los principales desafíos de gestión del tiempo en el entorno profesional actual",
            "Presenta técnicas probadas como Pomodoro, Time Blocking y GTD",
            "Ofrece un plan de acción de 30 días para implementar estas técnicas",
            "Incluye métricas para medir el progreso",
            "Proporciona estrategias para mantener la consistencia"
        ],
        formato="Guía práctica con listas de verificación, plantillas y ejemplos reales",
        publico_objetivo="Profesionales y ejecutivos de 30-50 años que buscan optimizar su tiempo y aumentar su productividad"
    )
    
    print(prompt)
    print(f"\n✓ Prompt válido: {validar_prompt(prompt)}")


def ejemplo_creativo():
    """Ejemplo de prompt para contenido creativo."""
    print("\n" + "=" * 80)
    print("EJEMPLO 3: Prompt para generación de contenido creativo")
    print("=" * 80)
    
    prompt = crear_prompt_craft(
        contexto="Desarrollar una campaña de marketing de contenidos para redes sociales",
        rol="Eres un estratega de marketing digital con especialización en storytelling y engagement en redes sociales",
        acciones=[
            "Define los objetivos de la campaña y el público objetivo",
            "Crea un calendario de contenidos para 4 semanas",
            "Desarrolla copy atractivo para cada publicación",
            "Diseña estrategias de engagement y llamadas a la acción",
            "Proporciona KPIs para medir el éxito de la campaña"
        ],
        formato="Plan de campaña detallado con ejemplos de posts, hashtags y mejores horarios de publicación",
        publico_objetivo="Emprendedores y pequeñas empresas que buscan aumentar su presencia en redes sociales"
    )
    
    print(prompt)
    print(f"\n✓ Prompt válido: {validar_prompt(prompt)}")


def main():
    """Función principal que ejecuta todos los ejemplos."""
    print("\n")
    print("╔" + "=" * 78 + "╗")
    print("║" + " " * 20 + "ECLOPROYEC - Ejemplos de Uso" + " " * 28 + "║")
    print("║" + " " * 15 + "Sistema de Creación de Prompts C.R.A.F.T." + " " * 21 + "║")
    print("╚" + "=" * 78 + "╝")
    print("\n")
    
    # Ejecutar ejemplos
    ejemplo_basico()
    ejemplo_productividad()
    ejemplo_creativo()
    
    print("\n" + "=" * 80)
    print("RESUMEN")
    print("=" * 80)
    print("""
Los ejemplos anteriores demuestran cómo usar el método C.R.A.F.T. para crear
prompts estructurados y efectivos. Cada prompt incluye:

- Contexto: Define claramente la situación y el propósito
- Rol: Establece la experiencia y especialización necesaria
- Acciones: Lista pasos específicos y secuenciales
- Formato: Especifica cómo debe estructurarse el resultado
- Público objetivo: Describe al destinatario del contenido

Para usar este sistema en tus propios proyectos:

1. Importa las funciones desde el módulo prompt_craft
2. Define cada componente del método C.R.A.F.T.
3. Usa crear_prompt_craft() para generar el prompt
4. Valida el resultado con validar_prompt()
5. Usa el prompt generado con ChatGPT o tu LLM preferido
    """)
    print("=" * 80)


if __name__ == "__main__":
    main()
