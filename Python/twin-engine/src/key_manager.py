"""
Gerenciador de chaves de API do Gemini
"""
import os
import json
import time
import logging
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from redis import Redis
from .config import Config
from .api_client import GeminiAPIClient
from cache import DiskCache, MemoryCache

logger = logging.getLogger(__name__)

class KeyManager:
    def __init__(self):
        self.redis_client = Redis(host='localhost', port=6379, db=0)
        self.disk_cache = DiskCache(ttl=Config().CACHE_TTL)
        self.memory_cache = MemoryCache(ttl=Config().CACHE_TTL)
        self.keys = []
        self.usage_stats = {}
        self.load_keys()
        
    def load_keys(self) -> None:
        """Carrega chaves de API do ambiente e backup"""
        api_keys = [k.strip() for k in Config.GEMINI_API_KEYS if k.strip()]
        
        if not api_keys:
            raise ValueError("Nenhuma chave de API encontrada na configuração")
            
        for key in api_keys:
            self.keys.append({
                "key": key,
                "rpm": 0,
                "rpd": 0,
                "last_used": None,
                "errors": 0,
                "valid": True
            })
            
        self._load_usage_stats()
        
    def _load_usage_stats(self) -> None:
        """Carrega estatísticas de uso do cache"""
        stats_json = self.redis_client.get("usage_stats")
        if stats_json:
            try:
                self.usage_stats = json.loads(stats_json)
            except json.JSONDecodeError:
                pass
                
    def save_usage_stats(self) -> None:
        """Salva estatísticas de uso no cache"""
        self.redis_client.setex(
            "usage_stats",
            Config.CACHE_TTL,
            json.dumps(self.usage_stats)
        )
        
    def get_available_key(self) -> Optional[Dict]:
        """Obtém a próxima chave disponível baseada em limites de taxa"""
        current_time = datetime.now()
        
        for key_data in self.keys:
            if not key_data["valid"]:
                continue
                
            # Verifica RPM (Requisições por Minuto)
            if key_data["rpm"] >= Config.MAX_RPM:
                continue
                
            # Verifica RPD (Requisições por Dia)
            if key_data["rpd"] >= Config.MAX_RPD:
                continue
                
            return key_data
            
        return None
        
    def update_key_stats(self, key_data: Dict, success: bool = True) -> None:
        """Atualiza estatísticas de uso para uma chave"""
        key = key_data["key"]
        
        if key not in self.usage_stats:
            self.usage_stats[key] = {
                "rpm": 0,
                "rpd": 0,
                "last_reset": datetime.now().strftime("%Y-%m-%d"),
                "total_requests": 0,
                "success_rate": 1.0
            }
            
        stats = self.usage_stats[key]
        current_date = datetime.now().strftime("%Y-%m-%d")
        
        # Reseta contador diário se necessário
        if current_date != stats["last_reset"]:
            stats["rpd"] = 0
            stats["last_reset"] = current_date
            
        # Atualiza contadores
        stats["rpm"] += 1
        stats["rpd"] += 1
        stats["total_requests"] += 1
        
        # Atualiza taxa de sucesso
        if not success:
            stats["errors"] = stats.get("errors", 0) + 1
            stats["success_rate"] = (stats["total_requests"] - stats["errors"]) / stats["total_requests"]
            
        self.save_usage_stats()
        
    def rotate_key(self, key_data: Dict) -> None:
        """Marca chave como inválida e tenta encontrar uma nova"""
        key_data["valid"] = False
        logger.warning(f"Chave rotacionada: {key_data['key'][:5]}...")
        
        # Tenta encontrar outra chave válida
        for other_key in self.keys:
            if other_key["valid"] and other_key != key_data:
                return other_key
                
        # Nenhuma chave válida restante
        return None
        
    def generate_content(self, prompt: str) -> Dict:
        """Gera conteúdo usando a melhor chave disponível"""
        # Primeiro verifica cache
        cached = self.memory_cache.get(prompt)
        if cached:
            return cached
            
        cached = self.disk_cache.get(prompt)
        if cached:
            return cached
            
        # Se não estiver em cache, usa chave disponível
        key_data = self.get_available_key()
        
        if not key_data:
            logger.warning("Nenhuma chave válida disponível")
            return {"error": "no_valid_keys", "message": "Todas as chaves de API atingiram seus limites"}
            
        client = GeminiAPIClient(key_data["key"], Config.GEMINI_MODEL_NAME)
        result = client.generate_content(prompt)
        
        # Atualiza estatísticas
        self.update_key_stats(key_data, success="error" not in result)
        
        # Verifica se precisamos rotacionar esta chave
        if "error" in result and "rate_limit" in str(result):
            key_data = self.rotate_key(key_data)
            
        # Salva no cache
        if "error" not in result:
            self.memory_cache.set(prompt, result)
            self.disk_cache.set(prompt, result)
            
        return result