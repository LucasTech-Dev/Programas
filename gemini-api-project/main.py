
import argparse
import json
import logging
import os
import time
from pathlib import Path
from typing import Dict, List, Optional

# Configuração de log
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/api_creation.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

def load_config(config_path: str = "config.json") -> Dict:
    """Carrega configurações do projeto."""
    config_file = Path(config_path)
    if not config_file.exists():
        raise FileNotFoundError(f"Arquivo de configuração {config_path} não encontrado")
    
    with open(config_file, "r") as f:
        return json.load(f)

def validate_config(config: Dict) -> None:
    """Valida as configurações."""
    required_keys = ["project_prefix", "organization_id", "region", "max_apis"]
    missing_keys = [key for key in required_keys if key not in config]
    if missing_keys:
        raise ValueError(f"Faltam as seguintes configurações: {missing_keys}")

def check_credentials() -> bool:
    """Verifica se as credenciais do GCP estão configuradas."""
    if "GOOGLE_APPLICATION_CREDENTIALS" not in os.environ:
        logger.error("Credenciais do GCP não configuradas. Defina GOOGLE_APPLICATION_CREDENTIALS.")
        return False
    return True

def create_project(project_id: str, organization_id: str) -> Optional[str]:
    """Cria um novo projeto GCP."""
    from utils.gemini_api import create_project
    try:
        return create_project(project_id, organization_id)
    except Exception as e:
        logger.error(f"Erro ao criar projeto {project_id}: {str(e)}")
        return None

def enable_gemini_api(project_id: str) -> bool:
    """Habilita a API do Gemini no projeto."""
    from utils.gemini_api import enable_gemini_api
    try:
        return enable_gemini_api(project_id)
    except Exception as e:
        logger.error(f"Erro ao habilitar API do Gemini no projeto {project_id}: {str(e)}")
        return False

def generate_credentials(project_id: str) -> Optional[Dict]:
    """Gera credenciais para o projeto."""
    from utils.gemini_api import generate_credentials
    try:
        return generate_credentials(project_id)
    except Exception as e:
        logger.error(f"Erro ao gerar credenciais para o projeto {project_id}: {str(e)}")
        return None

def main(args) -> None:
    """Função principal."""
    # Carregar configurações
    config = load_config()
    validate_config(config)
    
    # Verificar credenciais
    if not check_credentials():
        return
    
    # Processar argumentos
    if args.cleanup:
        logger.info("Removendo projetos...")
        # Implementar lógica de limpeza
        return
    
    # Criar projetos
    created_projects = []
    for i in range(config["max_apis"]):
        project_id = f"{config['project_prefix']}-{i}"
        logger.info(f"Criando projeto {project_id}...")
        
        # Criar projeto
        project_name = create_project(project_id, config["organization_id"])
        if project_name:
            created_projects.append(project_name)
            
            # Habilitar API do Gemini
            if enable_gemini_api(project_id):
                # Gerar credenciais
                credentials = generate_credentials(project_id)
                
                # Salvar credenciais em arquivo
                if credentials:
                    with open(f"credentials/{project_id}_key.json", "w") as f:
                        json.dump(credentials, f)
        
        # Aguardar entre tentativas
        if i < config["max_apis"] - 1:
            logger.info(f"Aguardando {config['retry_delay']} segundos antes de continuar...")
            time.sleep(config["retry_delay"])
    
    # Exibir resultados
    print("\n=== LISTA DAS APIS CRIADAS ===")
    for i, project in enumerate(created_projects):
        print(f"API {i+1}: {project}")
    
    logger.info(f"Criação de APIs concluída! {len(created_projects)} projetos criados.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Criador de APIs do Gemini')
    parser.add_argument('--cleanup', action='store_true', help='Limpar projetos criados')
    parser.add_argument('--verbose', action='store_true', help='Modo verbose')
    parser.add_argument('--dry-run', action='store_true', help='Executar sem criar projetos')
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    main(args)
