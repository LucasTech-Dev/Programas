"""
Cliente da API do Gemini
"""
import os
import requests
from typing import Dict, Any, Optional
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GeminiAPIClient:
    def __init__(self, api_key: str, model_name: str = "gemini-pro"):
        self.api_key = api_key
        self.model_name = model_name
        self.base_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent"
        
    def generate_content(self, prompt: str) -> Dict[Any, Any]:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        
        data = {
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        }
        
        try:
            response = requests.post(
                self.base_url,
                headers=headers,
                json=data,
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Erro na API: {response.status_code} - {response.text}")
                return {"error": response.status_code, "message": response.text}
                
        except Exception as e:
            logger.error(f"Falha na requisição: {str(e)}")
            return {"error": "request_failed", "message": str(e)}