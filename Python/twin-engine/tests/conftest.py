# tests/conftest.py
import pytest
from src.config import config

@pytest.fixture(autouse=True)
def setup_config():
    config.GEMINI_API_KEYS = ["test-key"]
    config.GEMINI_PROJECT_ID = "test-project"
    config.GEMINI_MODEL_NAME = "gemini-pro"
    config.CACHE_TTL = 3600
    config.MAX_RPM = 500
    config.MAX_RPD = 50000