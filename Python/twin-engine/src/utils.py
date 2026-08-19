"""
Funções utilitárias e auxiliares
"""
import hashlib
import json
from typing import Dict, Any, Optional
from pathlib import Path

def generate_cache_key(prompt: str) -> str:
    """Gera chave única para prompt"""
    return hashlib.md5(prompt.encode()).hexdigest()

def save_to_cache(prompt: str, response: Dict[str, Any], cache_dir: str = "cache") -> None:
    """Salva resposta em cache para prompt"""
    key = generate_cache_key(prompt)
    cache_path = Path(cache_dir)
    cache_path.mkdir(exist_ok=True)
    
    cache_file = cache_path / f"{key}.json"
    data = {
        "prompt": prompt,
        "response": response,
        "timestamp": time.time()
    }
    
    with open(cache_file, "w") as f:
        json.dump(data, f)

def load_from_cache(prompt: str, cache_dir: str = "cache", ttl: int = 3600) -> Optional[Dict[str, Any]]:
    """Carrega resposta do cache para prompt"""
    key = generate_cache_key(prompt)
    cache_path = Path(cache_dir)
    cache_file = cache_path / f"{key}.json"
    
    if not cache_file.exists():
        return None
        
    with open(cache_file, "r") as f:
        data = json.load(f)
        
    if time.time() - data["timestamp"] > ttl:
        cache_file.unlink()
        return None
        
    return data["response"]