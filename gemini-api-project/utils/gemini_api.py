import logging
import time
from typing import Dict, Optional

from google.cloud.resourcemanager_v3 import ProjectsClient
from google.cloud.serviceusage_v1 import ServiceUsageClient
from google.cloud.iam_v1 import IamClient
from google.oauth2 import service_account
from google.cloud.exceptions import GoogleCloudError

logger = logging.getLogger(__name__)

def create_project(project_id: str, organization_id: str) -> Optional[str]:
    """Cria um novo projeto GCP."""
    try:
        credentials = service_account.Credentials.from_service_account_file("credentials/chave.json")
        client = ProjectsClient(credentials=credentials)
        
        project_body = {
            'project_id': project_id,
            'name': f'API Gemini {project_id}',
            'parent': {'type': 'organization', 'id': organization_id}
        }
        
        request = client.create_project(request=project_body)
        logger.info(f"Projeto {project_id} criado com sucesso!")
        return request.name
        
    except GoogleCloudError as e:
        logger.error(f"Erro ao criar projeto {project_id}: {str(e)}")
        return None

def enable_gemini_api(project_id: str) -> bool:
    """Habilita a API do Gemini no projeto."""
    try:
        credentials = service_account.Credentials.from_service_account_file("credentials/chave.json")
        client = ServiceUsageClient(credentials=credentials)
        
        api_name = f"aiplatform.googleapis.com"
        service_request = client.enable_service(
            request={"name": f"projects/{project_id}/services/{api_name}"}
        )
        logger.info(f"API do Gemini habilitada no projeto {project_id}")
        return True
        
    except GoogleCloudError as e:
        logger.error(f"Erro ao habilitar API do Gemini no projeto {project_id}: {str(e)}")
        return False

def generate_credentials(project_id: str) -> Optional[Dict]:
    """Gera credenciais para o projeto."""
    try:
        credentials = service_account.Credentials.from_service_account_file("credentials/chave.json")
        client = IamClient(credentials=credentials)
        
        key_request = client.create_service_account_key(
            request={
                "name": f"projects/{project_id}/serviceAccounts/{project_id}@{project_id}.iam.gserviceaccount.com"
            }
        )
        logger.info(f"Credenciais geradas para o projeto {project_id}")
        return key_request
        
    except GoogleCloudError as e:
        logger.error(f"Erro ao gerar credenciais para o projeto {project_id}: {str(e)}")
        return None

def wait_for_operation(operation: str, timeout: int = 60) -> bool:
    """Aguarda a conclusão de uma operação."""
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            credentials = service_account.Credentials.from_service_account_file("credentials/chave.json")
            client = ProjectsClient(credentials=credentials)
            operation_status = client.get_operation(name=operation)
            if operation_status.done:
                if operation_status.error:
                    logger.error(f"Erro na operação: {operation_status.error.message}")
                    return False
                return True
            time.sleep(5)
        except Exception as e:
            logger.error(f"Erro ao verificar operação: {str(e)}")
            return False
    return False
