# tests/unit/test_key_manager.py
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)).replace('/unit', ''))

from src.key_manager import KeyManager
import pytest
from unittest.mock import patch, Mock

@pytest.fixture
def key_manager():
    with patch.dict('os.environ', {'GEMINI_API_KEYS': 'key1,key2', 'GEMINI_PROJECT_ID': 'test-project'}):
        # Simula falha na conexão com Redis durante os testes unitários
        with patch('src.key_manager.Redis') as mock_redis:
            mock_redis.return_value = None
            return KeyManager()

def test_load_keys(key_manager):
    assert len(key_manager.keys) == 2
    assert all(k["valid"] for k in key_manager.keys)

def test_get_available_key(key_manager):
    key = key_manager.get_available_key()
    assert key is not None
    assert key["valid"]

@patch('src.key_manager.GeminiAPIClient')
def test_generate_content_success(mock_client_class, key_manager):
    mock_client_instance = Mock()
    mock_client_instance.generate_content.return_value = {"candidates": [{"content": {"parts": [{"text": "Response"}]}}]}
    mock_client_class.return_value = mock_client_instance
    
    result = key_manager.generate_content("test prompt")
    assert result == {"candidates": [{"content": {"parts": [{"text": "Response"}]}}]}
    mock_client_class.assert_called_once_with("key1", "gemini-pro")