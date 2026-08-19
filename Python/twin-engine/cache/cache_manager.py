"""
Gerenciador de cache para armazenar respostas do Gemini
"""
from typing import Optional, Dict, Any
from pathlib import Path
import hashlib
import time

class CacheManager:
    def __init__(self, cache_dir: str = "cache", ttl: int = 3600):
        self.cache_dir = Path(cache_dir)
        self.ttl = ttl
        self.cache_dir.mkdir(exist_ok=True)
        
    def _get_key(self, prompt: str) -> str:
        """Gera chave única para prompt"""
        return hashlib.md5(prompt.encode()).hexdigest()
        
    def get(self, prompt: str) -> Optional[Dict[str, Any]]:
        """Obtém resposta em cache para prompt"""
        key = self._get_key(prompt)
        cache_file = self.cache_dir / f"{key}.json"
        
        if not cache_file.exists():
            return None
            
        with open(cache_file, "r") as f:
            data = json.load(f)
            
        if time.time() - data["timestamp"] > self.ttl:
            cache_file.unlink()
            return None
            
        return data["response"]
        
    def set(self, prompt: str, response: Dict[str, Any]) -> None:
        """Define resposta em cache para prompt"""
        key = self._get_key(prompt)
        cache_file = self.cache_dir / f"{key}.json"
        
        data = {
            "prompt": prompt,
            "response": response,
            "timestamp": time.time()
        }
        
        with open(cache_file, "w") as f:
            json.dump(data, f)
            
    def clear(self) -> None:
        """Limpa todo o cache"""
        for file in self.cache_dir.glob("*.json"):
            file.unlink()