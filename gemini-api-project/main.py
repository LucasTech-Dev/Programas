# main.py

import argparse
import json
import logging
import os
import time
from pathlib import Path
from typing import Dict, Optional

# Garantir que o diretório de logs exista antes de configurar o Handler
Path("logs").mkdir(exist_ok=True)

# Configuração de log
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/api_creation.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)


def load_config(config_path: str = "config.json") -> Dict:
    """Carrega configurações do projeto."""
    config_file = Path(config_path)
    if not config_file.exists():
        raise FileNotFoundError(f"Arquivo de configuração {config_path} não encontrado.")
    
    with open(config_file, "r", encoding="utf-8") as f:
        return json.load(f)


def validate_config(config: Dict) -> None:
    """Valida as configurações obrigatórias."""
    required_keys = ["project_prefix", "organization_id", "region", "max_apis"]
    missing_keys = [key for key in required_keys if key not in config]
    if missing_keys:
        raise ValueError(f"Faltam as seguintes configurações no config.json: {missing_keys}")


def check_credentials() -> bool:
    """Verifica se a variável de ambiente das credenciais do GCP está definida."""
    if "GOOGLE_APPLICATION_CREDENTIALS" not in os.environ:
        # Se o arquivo credentials/chave.json existir localmente, podemos defini-lo automaticamente
        if Path("credentials/chave.json").exists():
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "credentials/chave.json"
            logger.info("GOOGLE_APPLICATION_CREDENTIALS definido para 'credentials/chave.json'.")
            return True
        else:
            logger.error("Credenciais do GCP não configuradas! Defina a variável GOOGLE_APPLICATION_CREDENTIALS.")
            return False
    return True


def create_project(project_id: str, organization_id: str) -> Optional[str]:
    """Cria um novo projeto GCP chamando a função do módulo utils.gemini_api."""
    from utils.gemini_api import create_project as api_create_project
    try:
        return api_create_project(project_id, organization_id)
    except Exception as e:
        logger.error(f"Erro ao criar projeto {project_id}: {str(e)}")
        return None


def enable_gemini_api(project_id: str) -> bool:
    """Habilita a API do Gemini no projeto."""
    from utils.gemini_api import enable_gemini_api as api_enable_gemini
    try:
        return api_enable_gemini(project_id)
    except Exception as e:
        logger.error(f"Erro ao habilitar API do Gemini no projeto {project_id}: {str(e)}")
        return False


def generate_credentials(project_id: str) -> Optional[Dict]:
    """Gera e retorna as credenciais para o projeto."""
    from utils.gemini_api import generate_credentials as api_generate_credentials
    try:
        return api_generate_credentials(project_id)
    except Exception as e:
        logger.error(f"Erro ao gerar credenciais para o projeto {project_id}: {str(e)}")
        return None


def main(args) -> None:
    """Função principal de execução."""
    # 1. Carregar e validar configurações
    config = load_config()
    validate_config(config)
    
    # 2. Verificar credenciais de autenticação
    if not check_credentials():
        return
    
    # 3. Processar opção de limpeza
    if args.cleanup:
        logger.info("Modo de limpeza ativado (ainda não implementado)...")
        return
    
    created_projects = []
    retry_delay = config.get("retry_delay", 2)
    
    # 4. Loop para criar os projetos e habilitar as APIs
    for i in range(config["max_apis"]):
        project_id = f"{config['project_prefix']}-{i}"
        logger.info(f"[{i+1}/{config['max_apis']}] Processando projeto: {project_id}...")
        
        if args.dry_run:
            logger.info(f"[DRY-RUN] Projeto {project_id} seria criado.")
            created_projects.append(project_id)
            continue

        # Criar projeto no GCP
        created_id = create_project(project_id, config["organization_id"])
        if created_id:
            created_projects.append(created_id)
            
            # Habilitar API do Gemini (Vertex AI)
            if enable_gemini_api(created_id):
                # Gerar credenciais da Service Account
                credentials = generate_credentials(created_id)
                
                # Salvar arquivo de chave JSON
                if credentials:
                    Path("credentials").mkdir(exist_ok=True)
                    key_file = f"credentials/{created_id}_key.json"
                    with open(key_file, "w", encoding="utf-8") as f:
                        json.dump(credentials, f, indent=2)
                    logger.info(f"Credenciais salvas em '{key_file}'")
        
        # Aguarda o tempo estipulado antes da próxima iteração
        if i < config["max_apis"] - 1 and not args.dry_run:
            logger.info(f"Aguardando {retry_delay} segundos antes do próximo...")
            time.sleep(retry_delay)
    
    # 5. Exibir resultado final
    print("\n" + "=" * 35)
    print("      LISTA DAS APIS CRIADAS     ")
    print("=" * 35)
    for i, proj in enumerate(created_projects):
        print(f"  API {i+1}: {proj}")
    print("=" * 35 + "\n")
    
    logger.info(f"Processo concluído! Total de {len(created_projects)} projetos processados.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Criador automatizado de projetos e APIs do Gemini')
    parser.add_argument('--cleanup', action='store_true', help='Remover projetos criados previamente')
    parser.add_argument('--verbose', action='store_true', help='Exibir logs detalhados de DEBUG')
    parser.add_argument('--dry-run', action='store_true', help='Simular execução sem alterar recursos no GCP')
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    main(args)