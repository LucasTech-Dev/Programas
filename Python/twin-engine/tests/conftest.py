# tests/conftest.py
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import pytest
from src.config import Config

@pytest.fixture(autouse=True)
def setup_config():
    Config.GEMINI_API_KEYS = ["test-key"]
    Config.GEMINI_PROJECT_ID = "test-project"
    Config.GEMINI_MODEL_NAME = "gemini-pro"
    Config.CACHE_TTL = 3600
    Config.MAX_RPM = 500
    Config.MAX_RPD = 50000