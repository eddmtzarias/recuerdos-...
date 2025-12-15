"""
Módulo principal del proyecto ECLOPROYEC

Este módulo contiene las funciones centrales para trabajar con prompts.
"""


def crear_prompt_craft(contexto, rol, acciones, formato, publico_objetivo):
    """
    Crea un prompt estructurado usando el método C.R.A.F.T.
    
    Args:
        contexto (str): Contexto que define la situación
        rol (str): Tipo de experiencia y especialización
        acciones (list): Lista de acciones a realizar
        formato (str): Disposición o estilo del contenido
        publico_objetivo (str): Descripción del destinatario
    
    Returns:
        str: Prompt estructurado en formato C.R.A.F.T.
    """
    prompt = f"""Contexto: {contexto}

Rol: {rol}

Acciones:
"""
    
    for i, accion in enumerate(acciones, 1):
        prompt += f"{i}. {accion}\n"
    
    prompt += f"""
Formato: {formato}

Público objetivo: {publico_objetivo}
"""
    
    return prompt


def validar_prompt(prompt):
    """
    Valida que un prompt contenga todos los elementos necesarios.
    
    Args:
        prompt (str): El prompt a validar
    
    Returns:
        bool: True si el prompt es válido, False en caso contrario
    """
    elementos_requeridos = ["Contexto:", "Rol:", "Acciones:", "Formato:", "Público objetivo:"]
    return all(elemento in prompt for elemento in elementos_requeridos)


if __name__ == "__main__":
    # Ejemplo de uso
    ejemplo_prompt = crear_prompt_craft(
        contexto="Crear una guía para establecer objetivos mensuales",
        rol="Coach experto en productividad con más de 20 años de experiencia",
        acciones=[
            "Explicar la importancia de los objetivos mensuales",
            "Proporcionar una guía paso a paso",
            "Ofrecer estrategias prácticas"
        ],
        formato="Texto plano con encabezados claros",
        publico_objetivo="Profesionales de 25-55 años"
    )
    
    print(ejemplo_prompt)
    print(f"\n¿Es válido? {validar_prompt(ejemplo_prompt)}")
