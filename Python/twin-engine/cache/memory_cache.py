"""
Cache em memória para armazenar respostas do Gemini
"""
import time
from typing import Optional, Dict, Any

class MemoryCache:
    def __init__(self, ttl: int = 3600):
        self.cache = {}
        self.ttl = ttl
        
    def get(self, key: str) -> Optional[Dict[str, Any]]:
        """Obtém valor do cache por chave"""
        if key not in self.cache:
            return None
            
        value, timestamp = self.cache[key]
        
        if time.time() - timestamp > self.ttl:
            del self.cache[key]
            return None
            
        return value
        
    def set(self, key: str, value: Dict[str, Any]) -> None:
        """Define valor no cache por chave"""
        self.cache[key] = (value, time.time())
        
    def clear(self) -> None:
        """Limpa todo o cache"""
        self.cache.clear()