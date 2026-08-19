"""
Configurações globais do Twin Engine
"""
import os
from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()

class Config(BaseModel):
    GEMINI_API_KEYS: list = Field(default_factory=list)
    GEMINI_PROJECT_ID: str = ""
    GEMINI_MODEL_NAME: str = "gemini-pro"
    CACHE_TTL: int = 3600
    MAX_RPM: int = 500
    MAX_RPD: int = 50000
    
    class Config:
        env_file = ".env"
        
    @classmethod
    def validate(cls):
        if not all([cls.GEMINI_API_KEYS, cls.GEMINI_PROJECT_ID]):
            raise ValueError("Configuração incompleta")