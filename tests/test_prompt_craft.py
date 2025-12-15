"""
Tests para el módulo prompt_craft
"""
import unittest
import sys
import os

# Añadir el directorio src al path para poder importar los módulos
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from prompt_craft import crear_prompt_craft, validar_prompt


class TestPromptCraft(unittest.TestCase):
    """Tests para las funciones de creación de prompts"""
    
    def setUp(self):
        """Configuración inicial para los tests"""
        self.contexto_ejemplo = "Este es un contexto de prueba"
        self.rol_ejemplo = "Experto en testing"
        self.acciones_ejemplo = ["Acción 1", "Acción 2", "Acción 3"]
        self.formato_ejemplo = "Texto plano"
        self.publico_ejemplo = "Desarrolladores"
    
    def test_crear_prompt_craft(self):
        """Test para verificar la creación de prompts C.R.A.F.T."""
        prompt = crear_prompt_craft(
            self.contexto_ejemplo,
            self.rol_ejemplo,
            self.acciones_ejemplo,
            self.formato_ejemplo,
            self.publico_ejemplo
        )
        
        self.assertIsInstance(prompt, str)
        self.assertIn("Contexto:", prompt)
        self.assertIn("Rol:", prompt)
        self.assertIn("Acciones:", prompt)
        self.assertIn("Formato:", prompt)
        self.assertIn("Público objetivo:", prompt)
        self.assertIn(self.contexto_ejemplo, prompt)
        self.assertIn(self.rol_ejemplo, prompt)
    
    def test_validar_prompt_valido(self):
        """Test para validar un prompt correcto"""
        prompt = crear_prompt_craft(
            self.contexto_ejemplo,
            self.rol_ejemplo,
            self.acciones_ejemplo,
            self.formato_ejemplo,
            self.publico_ejemplo
        )
        
        self.assertTrue(validar_prompt(prompt))
    
    def test_validar_prompt_invalido(self):
        """Test para validar un prompt incompleto"""
        prompt_invalido = "Este es un prompt incompleto sin estructura"
        self.assertFalse(validar_prompt(prompt_invalido))
    
    def test_prompt_contiene_acciones(self):
        """Test para verificar que las acciones se incluyen correctamente"""
        prompt = crear_prompt_craft(
            self.contexto_ejemplo,
            self.rol_ejemplo,
            self.acciones_ejemplo,
            self.formato_ejemplo,
            self.publico_ejemplo
        )
        
        for accion in self.acciones_ejemplo:
            self.assertIn(accion, prompt)


if __name__ == '__main__':
    unittest.main()
