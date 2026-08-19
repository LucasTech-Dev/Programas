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
        # Carrega valores do ambiente quando aplicável
        env_keys = os.getenv("GEMINI_API_KEYS")
        if env_keys is not None:
            if isinstance(env_keys, str):
                keys = [k.strip() for k in env_keys.split(",") if k.strip()]
            else:
                keys = list(env_keys)
        else:
            keys = cls.GEMINI_API_KEYS if isinstance(cls.GEMINI_API_KEYS, list) else []

        project_id = os.getenv("GEMINI_PROJECT_ID") or cls.GEMINI_PROJECT_ID

        if not keys or not project_id:
            raise ValueError("Configuração incompleta")

        # Valida limites de taxa
        if cls.MAX_RPM <= 0 or cls.MAX_RPD <= 0:
            raise ValueError("Limites de taxa inválidos")

        # Atualiza atributos da classe para uso posterior
        cls.GEMINI_API_KEYS = keys
        cls.GEMINI_PROJECT_ID = project_id
        return None