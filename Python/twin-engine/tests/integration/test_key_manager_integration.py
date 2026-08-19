# tests/integration/test_key_manager_integration.py
import pytest
from src.key_manager import KeyManager

def test_full_workflow():
    key_manager = KeyManager()
    
    # Gerar conteúdo
    result = key_manager.generate_content("Qual é o clima hoje?")
    assert "error" not in result
    
    # Verificar se estatísticas foram atualizadas
    assert "usage_stats" in dir(key_manager)
    assert len(key_manager.usage_stats) > 0