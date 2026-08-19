"""
Módulo de cache para armazenar respostas do Gemini
"""
from .disk_cache import DiskCache
from .memory_cache import MemoryCache

__all__ = ["DiskCache", "MemoryCache"]