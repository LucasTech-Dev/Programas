# Criador de APIs do Gemini no GCP

Script para criar 50 APIs do Gemini no Google Cloud Platform.

## Requisitos
- Python 3.8+
- Google Cloud SDK

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/gemini-api-project.git
   ```

2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure as credenciais do GCP:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="credentials/chave.json"
   ```

## Uso
```bash
python main.py
```

## Estrutura do projeto
- credentials/: Arquivos de credenciais do GCP
- logs/: Arquivos de log do sistema
- utils/: Módulos utilitários
- tests/: Testes unitários
