# tests/unit/test_api_client.py
import pytest
from unittest.mock import Mock, patch
from src.api_client import GeminiAPIClient

@pytest.fixture
def api_client():
    return GeminiAPIClient("test-key")

@patch('requests.post')
def test_generate_content_success(mock_post, api_client):
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"candidates": [{"content": {"parts": [{"text": "Response"}]}}]}
    mock_post.return_value = mock_response
    
    result = api_client.generate_content("test prompt")
    assert result == {"candidates": [{"content": {"parts": [{"text": "Response"}]}}]}

@patch('requests.post')
def test_generate_content_error(mock_post, api_client):
    mock_response = Mock()
    mock_response.status_code = 429
    mock_response.text = "Rate limit exceeded"
    mock_post.return_value = mock_response
    
    result = api_client.generate_content("test prompt")
    assert "error" in result