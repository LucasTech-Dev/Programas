import os
import subprocess
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types
from google.genai.errors import APIError
import time
import json
import hashlib
import threading
import random
import signal
import sys

load_dotenv()

# Apenas uma chave de API
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY não encontrada no arquivo .env.")

# Cache para respostas
CACHE_DIR = "cache"
os.makedirs(CACHE_DIR, exist_ok=True)
cache_lock = threading.Lock()

# Semáforo para limitar requisições simultâneas
semaphore = threading.Semaphore(20)

# Contadores para estatísticas
request_stats = {
    'total': 0,
    'failed': 0,
    'retried': 0,
    'cached': 0
}

# Mutex para estatísticas
stats_lock = threading.Lock()

# --- Funções auxiliares ---
def get_cache_key(prompt):
    """Gera uma chave de cache para o prompt."""
    return hashlib.md5(prompt.encode()).hexdigest()

def get_cached_response(prompt):
    """Retorna resposta em cache se disponível."""
    key = get_cache_key(prompt)
    cache_file = os.path.join(CACHE_DIR, f"{key}.json")
    
    if os.path.exists(cache_file):
        with open(cache_file, 'r') as f:
            data = json.load(f)
            if time.time() - data['timestamp'] < 3600:  # 1 hora
                return data['response']
    return None

def save_to_cache(prompt, response):
    """Salva resposta no cache."""
    key = get_cache_key(prompt)
    cache_file = os.path.join(CACHE_DIR, f"{key}.json")
    
    with cache_lock:
        with open(cache_file, 'w') as f:
            json.dump({
                'prompt': prompt,
                'response': response,
                'timestamp': time.time()
            }, f)

def rate_limited_api_call(api_call, *args, **kwargs):
    """Chama a API com limitação de taxa."""
    with semaphore:
        return api_call(*args, **kwargs)

def exponential_backoff(max_retries=5, base_delay=1):
    """Aplica backoff exponencial com jitter."""
    def decorator(func):
        def wrapper(*args, **kwargs):
            retries = 0
            delay = base_delay
            
            while retries < max_retries:
                try:
                    return func(*args, **kwargs)
                except APIError as e:
                    if "quota exceeded" in str(e).lower():
                        jitter = random.uniform(0, delay * 0.1)
                        actual_delay = delay + jitter
                        
                        print(f"Quota excedida. Esperando {actual_delay:.2f}s...")
                        time.sleep(actual_delay)
                        
                        with stats_lock:
                            request_stats['retried'] += 1
                        
                        delay *= 2  # Exponential backoff
                        retries += 1
                    else:
                        raise e
            raise Exception("Número máximo de tentativas excedido")
        return wrapper
    return decorator

# --- FERRAMENTAS LOCAIS ---
def criar_ou_editar_arquivo(caminho_relativo: str, conteudo: str) -> str:
    """Cria ou edita um arquivo de texto dentro do projeto."""
    try:
        caminho = Path(caminho_relativo)
        caminho.parent.mkdir(parents=True, exist_ok=True)
        with open(caminho, "w", encoding="utf-8") as f:
            f.write(conteudo)
        return f"Sucesso: Arquivo '{caminho_relativo}' salvo!"
    except Exception as e:
        return f"Erro ao salvar arquivo: {str(e)}"

def deletar_arquivo(caminho_relativo: str) -> str:
    """Deleta um arquivo especificado no projeto."""
    try:
        caminho = Path(caminho_relativo)
        if caminho.exists() and caminho.is_file():
            caminho.unlink()
            return f"Sucesso: Arquivo '{caminho_relativo}' removido com sucesso!"
        return f"Aviso: O arquivo '{caminho_relativo}' não existe."
    except Exception as e:
        return f"Erro ao deletar arquivo: {str(e)}"

def executar_comando_git(comando: str) -> str:
    """Executa um comando Git no terminal local."""
    if not comando.startswith("git "):
        return "Erro de segurança: Apenas comandos do Git são permitidos."
    try:
        resultado = subprocess.run(
            comando,
            shell=True,
            capture_output=True,
            text=True,
            check=True
        )
        return f"Comando executado com sucesso:\n{resultado.stdout}"
    except subprocess.CalledProcessError as e:
        return f"Erro ao executar o comando git:\n{e.stderr}"

# --- CONFIGURAÇÃO DO CLIENTE E CHAT ---
client = genai.Client(api_key=api_key)

chat = client.chats.create(
    model="gemini-3.6-flash",
    config=types.GenerateContentConfig(
        tools=[criar_ou_editar_arquivo, deletar_arquivo, executar_comando_git]
    )
)

print("--- Chat do Gemini com Controle do Sistema/Git (digite 'sair' para encerrar) ---\n")

# Handler para saída limpa
def signal_handler(sig, frame):
    print("\nEncerrando o chat...")
    with stats_lock:
        print(f"Estatísticas:")
        print(f"- Total de requisições: {request_stats['total']}")
        print(f"- Requisições falhadas: {request_stats['failed']}")
        print(f"- Requisições retratadas: {request_stats['retried']}")
        print(f"- Respostas em cache: {request_stats['cached']}")
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

while True:
    mensagem = input("Você: ")
    
    if mensagem.strip().lower() in ["sair", "exit", "quit"]:
        print("\nEncerrando o chat.")
        break

    if not mensagem.strip():
        continue

    # Verificar cache primeiro
    cached_response = get_cached_response(mensagem)
    if cached_response:
        with stats_lock:
            request_stats['cached'] += 1
        print(f"\nGemini: {cached_response}\n")
        continue

    # Incrementar contador de total
    with stats_lock:
        request_stats['total'] += 1

    # Aplicar limitação de taxa e tentativa automática
    @exponential_backoff(max_retries=5)
    def send_message_with_retry():
        return chat.send_message(mensagem)

    try:
        # Tenta a API principal e usa fallback se falhar
        response = send_message_with_retry()
        
        # Salvar no cache
        save_to_cache(mensagem, response.text)
        print(f"\nGemini: {response.text}\n")
        
    except APIError as e:
        with stats_lock:
            request_stats['failed'] += 1
        print(f"\n[Erro na API]: {e.message}\n")
    except Exception as e:
        with stats_lock:
            request_stats['failed'] += 1
        print(f"\n[Erro inesperado]: {e}\n")