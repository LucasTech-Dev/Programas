# utils/gemini_api.py

import logging
import subprocess
import time
import os
from typing import Dict, Optional

logger = logging.getLogger(__name__)

def check_gcloud_installed() -> bool:
    """Verifica se o gcloud está instalado."""
    try:
        subprocess.run(["gcloud", "--version"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return True
    except subprocess.CalledProcessError:
        logger.error("gcloud não está instalado ou não está configurado corretamente.")
        return False

def check_virtual_env() -> bool:
    """Verifica se o ambiente virtual está ativo."""
    return "VIRTUAL_ENV" in os.environ

def activate_virtual_env() -> bool:
    """Ativa o ambiente virtual."""
    try:
        venv_path = os.path.join(os.getcwd(), ".venv")
        activate_script = os.path.join(venv_path, "bin", "activate")
        
        if not os.path.exists(activate_script):
            logger.error(f"Ambiente virtual não encontrado em {venv_path}")
            return False
            
        subprocess.run(f"source {activate_script}", shell=True, check=True)
        return True
    except subprocess.CalledProcessError:
        logger.error("Falha ao ativar o ambiente virtual.")
        return False

def create_project(project_id: str, organization_id: str) -> Optional[str]:
    """Cria um novo projeto GCP usando o gcloud CLI."""
    if not check_virtual_env():
        if not activate_virtual_env():
            return None
            
    if not check_gcloud_installed():
        return None
        
    try:
        # Executa o comando oficial de criação
        cmd = f"gcloud projects create {project_id} --name='API Gemini {project_id}' --organization={organization_id}"
        logger.info(f"Executando comando: {cmd}")
        subprocess.run(cmd, shell=True, check=True, capture_output=True)
        
        logger.info(f"Projeto {project_id} criado com sucesso!")
        return project_id
    except subprocess.CalledProcessError as e:
        logger.error(f"Erro ao criar projeto {project_id} via CLI: {e.stderr.decode()}")
        return None
    except Exception as e:
        logger.error(f"Erro ao criar projeto {project_id}: {str(e)}")
        return None

def enable_gemini_api(project_id: str) -> bool:
    """Habilita a API do Gemini no projeto."""
    if not check_virtual_env():
        if not activate_virtual_env():
            return False
            
    if not check_gcloud_installed():
        return False
        
    try:
        # Ativa a API do Gemini
        cmd = f"gcloud services enable aiplatform.googleapis.com --project={project_id}"
        logger.info(f"Executando comando: {cmd}")
        subprocess.run(cmd, shell=True, check=True, capture_output=True)
        
        logger.info(f"API do Gemini habilitada no projeto {project_id}")
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Erro ao habilitar API do Gemini no projeto {project_id}: {e.stderr.decode()}")
        return False
    except Exception as e:
        logger.error(f"Erro ao habilitar API do Gemini no projeto {project_id}: {str(e)}")
        return False

def generate_credentials(project_id: str) -> Optional[Dict]:
    """Gera credenciais para o projeto."""
    if not check_virtual_env():
        if not activate_virtual_env():
            return None
            
    if not check_gcloud_installed():
        return None
        
    try:
        # Cria uma conta de serviço para o projeto
        cmd = f"gcloud iam service-accounts create gemini-sa-{project_id} --display-name='Gemini Service Account for {project_id}' --project={project_id}"
        logger.info(f"Executando comando: {cmd}")
        subprocess.run(cmd, shell=True, check=True, capture_output=True)
        
        # Concede permissões à conta de serviço
        cmd = f"gcloud projects add-iam-policy-binding {project_id} --member='serviceAccount:gemini-sa-{project_id}@{project_id}.iam.gserviceaccount.com' --role='roles/editor'"
        logger.info(f"Executando comando: {cmd}")
        subprocess.run(cmd, shell=True, check=True, capture_output=True)
        
        # Gera as credenciais
        cmd = f"gcloud iam service-accounts keys create ./credentials/{project_id}_key.json --iam-account=gemini-sa-{project_id}@{project_id}.iam.gserviceaccount.com"
        logger.info(f"Executando comando: {cmd}")
        subprocess.run(cmd, shell=True, check=True, capture_output=True)
        
        logger.info(f"Credenciais geradas para o projeto {project_id}")
        return {"status": "success", "message": f"Credenciais salvas em ./credentials/{project_id}_key.json"}
    except subprocess.CalledProcessError as e:
        logger.error(f"Erro ao gerar credenciais para o projeto {project_id}: {e.stderr.decode()}")
        return None
    except Exception as e:
        logger.error(f"Erro ao gerar credenciais para o projeto {project_id}: {str(e)}")
        return None

def wait_for_operation(operation: str, timeout: int = 60) -> bool:
    """Aguarda a conclusão de uma operação."""
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            # Verifica o status da operação
            cmd = f"gcloud projects describe {operation}"
            logger.info(f"Executando comando: {cmd}")
            result = subprocess.run(cmd, shell=True, capture_output=True)
            
            if result.returncode == 0:
                logger.info(f"Operação {operation} concluída!")
                return True
                
            time.sleep(5)
        except Exception as e:
            logger.error(f"Erro ao verificar operação: {str(e)}")
            return False
    return False