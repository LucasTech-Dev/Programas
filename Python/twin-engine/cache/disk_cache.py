"""
Cache de disco para armazenar respostas do Gemini
"""
import os
import json
import time
from typing import Optional, Dict, Any
from pathlib import Path

class DiskCache:
    def __init__(self, cache_dir: str = "cache", ttl: int = 3600):
        self.cache_dir = Path(cache_dir)
        self.ttl = ttl
        self.cache_dir.mkdir(exist_ok=True)
        
    def get(self, key: str) -> Optional[Dict[str, Any]]:
        """Obtém valor do cache por chave"""
        cache_file = self.cache_dir / f"{key}.json"
        if not cache_file.exists():
            return None
            
        with open(cache_file, "r") as f:
            data = json.load(f)
            
        if time.time() - data["timestamp"] > self.ttl:
            cache_file.unlink()
            return None
            
        return data
        
    def set(self, key: str, value: Dict[str, Any]) -> None:
        """Define valor no cache por chave"""
        cache_file = self.cache_dir / f"{key}.json"
        data = {
            "value": value,
            "timestamp": time.time()
        }
        
        with open(cache_file, "w") as f:
            json.dump(data, f)
            
    def clear(self) -> None:
        """Limpa todo o cache"""
        for file in self.cache_dir.glob("*.json"):
            file.unlink()