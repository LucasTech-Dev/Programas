
import pytest
from unittest.mock import patch, MagicMock

from utils.gemini_api import create_project, enable_gemini_api, generate_credentials

@patch('utils.gemini_api.ProjectsClient')
def test_create_project(mock_client):
    """Testa a função create_project."""
    mock_instance = mock_client.return_value
    mock_instance.create_project.return_value.name = "projects/test-project"
    
    result = create_project("test-project", "123456789")
    assert result == "projects/test-project"
    mock_client.assert_called_once()

@patch('utils.gemini_api.ServiceUsageClient')
def test_enable_gemini_api(mock_client):
    """Testa a função enable_gemini_api."""
    mock_instance = mock_client.return_value
    mock_instance.enable_service.return_value = True
    
    result = enable_gemini_api("test-project")
    assert result is True
    mock_client.assert_called_once()

@patch('utils.gemini_api.IamClient')
def test_generate_credentials(mock_client):
    """Testa a função generate_credentials."""
    mock_instance = mock_client.return_value
    mock_instance.create_service_account_key.return_value = {"key": "value"}
    
    result = generate_credentials("test-project")
    assert result == {"key": "value"}
    mock_client.assert_called_once()

def test_invalid_credentials():
    """Testa tratamento de credenciais inválidas."""
    with pytest.raises(Exception):
        create_project("test-project", "invalid")
