# tests/unit/test_config.py
import pytest
from unittest.mock import patch
from src.config import Config

def test_validate_success():
    with patch.dict('os.environ', {'GEMINI_API_KEYS': 'key1,key2', 'GEMINI_PROJECT_ID': 'test-project'}):
        assert Config.validate() is None

def test_validate_missing_keys():
    with patch.dict('os.environ', {'GEMINI_API_KEYS': '', 'GEMINI_PROJECT_ID': 'test-project'}):
        with pytest.raises(ValueError):
            Config.validate()

def test_validate_missing_project_id():
    with patch.dict('os.environ', {'GEMINI_API_KEYS': 'key1,key2', 'GEMINI_PROJECT_ID': ''}):
        with pytest.raises(ValueError):
            Config.validate()