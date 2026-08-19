# Twin Engine - Gerenciador de Chaves de API Gemini

O **Twin Engine** é um sistema para gerenciamento centralizado de chaves de API do Google AI Studio (Gemini). O projeto otimiza o uso da API distribuindo a carga de requisições, rotacionando chaves que atingem limites de taxa e armazenando respostas em cache para máxima eficiência.

---

## 🎯 Funcionalidades

- **Gerenciamento Centralizado:** Carregamento e validação de múltiplas chaves de API.
- **Balanceamento de Carga:** Distribuição inteligente de requisições entre as chaves disponíveis.
- **Rotatividade Automática:** Troca dinâmica de chave ao atingir limites de RPM/RPD.
- **Cache Local:** Armazenamento de respostas para redução de custos e latência.
- **Histórico e Métricas:** Acompanhamento do consumo individual de cada chave.

---

## 📁 Estrutura do Projeto

```text
twin-engine/
├── README.md
├── requirements.txt
├── .env
├── .gitignore
├── cache/
│   └── (armazenamento local de cache)
├── src/
│   ├── __init__.py
│   ├── main.py          # Ponto de entrada principal
│   ├── config.py        # Configurações globais
│   ├── api_client.py    # Cliente de integração com a API
│   ├── key_manager.py   # Gerenciamento e rotação de chaves
│   └── utils.py         # Funções utilitárias e auxiliares
└── tests/               # Testes unitários da aplicação