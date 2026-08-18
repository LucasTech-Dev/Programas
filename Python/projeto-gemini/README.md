Projeto Gemini - guia rápido

Este projeto cria um chatbot simples usando a API Gemini (Google) em Python.

Passos rápidos (no Linux do Chromebook):

1) Verifique a arquitetura do seu Chromebook:

```
dpkg --print-architecture
```

Se aparecer amd64 use a versão x64 do VS Code; se aparecer arm64 use a versão arm64.

2) Instalar VS Code (exemplo para arm64):

```
sudo apt update
sudo apt install -y wget gpg
wget -O code.deb "https://update.code.visualstudio.com/latest/linux-deb-arm64/stable"
sudo apt install ./code.deb
code --version
```

3) Abra a pasta do projeto no VS Code:

File → Open Folder → selecione Python/projeto-gemini

4) Criar e ativar ambiente virtual (no terminal integrado):

```
python3 -m venv .venv
source .venv/bin/activate
```

5) Instalar dependências:

```
pip install --upgrade pip
pip install -r requirements.txt
```

6) Configurar a chave de API:

Edite o arquivo .env e coloque sua chave:

```
GEMINI_API_KEY=SUA_API_KEY_AQUI
```

Crie a chave em https://aistudio.google.com/ e cole aqui. NÃO envie esse arquivo ao Git.

7) Executar o chatbot:

```
source .venv/bin/activate
python src/main.py
```

8) Debug no VS Code: selecione o interpretador do .venv (Ctrl+Shift+P → Python: Select Interpreter) e rode o arquivo (Run Python File ou F5).

Arquivos principais:

- [Python/projeto-gemini/src/main.py](Python/projeto-gemini/src/main.py)
- [Python/projeto-gemini/.env](Python/projeto-gemini/.env)
- [Python/projeto-gemini/.gitignore](Python/projeto-gemini/.gitignore)
- [Python/projeto-gemini/requirements.txt](Python/projeto-gemini/requirements.txt)

Próximos passos sugeridos:

- Histórico de conversa
- Tratamento de erros
- Interface web com Flask/FastAPI
