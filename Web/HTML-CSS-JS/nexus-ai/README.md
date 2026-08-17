# Nexus AI

Aplicação web de chat pessoal em JavaScript com arquitetura modular.

## Visão geral

- painel lateral com histórico de chats
- área central de mensagens
- composer com envio e carregamento
- persistência local em `localStorage`
- separação em camadas: `core`, `services`, `components`, `state`

## Estrutura

```text
nexus-ai/
├── index.html
├── src/
│   └── js/
│       ├── app.js
│       ├── config/
│       │   ├── app.config.js
│       │   └── api.config.js
│       ├── core/
│       │   ├── ChatManager.js
│       │   ├── ConversationManager.js
│       │   ├── EventBus.js
│       │   ├── MessageManager.js
│       │   └── StateStore.js
│       ├── services/
│       │   ├── AIService.js
│       │   ├── ExportService.js
│       │   └── StorageService.js
│       ├── components/
│       │   ├── ChatView.js
│       │   ├── Composer.js
│       │   ├── Sidebar.js
│       │   └── Toast.js
│       ├── state/
│       │   └── store.js
│       └── utils/
│           ├── formatters.js
│           ├── helpers.js
│           ├── markdown.js
│           └── validators.js
└── README.md
```

## Como executar

1. Abra o projeto em um servidor local.
2. Se desejar usar um servidor simples:

```bash
cd nexus-ai
python3 -m http.server 8000
```

3. Acesse `http://localhost:8000`.

## Observação

Este projeto foi implementado como base modular para um produto pessoal de IA, mantendo a interface separada da lógica de aplicação e da camada de serviços.

## Observação

A aplicação foi montada como uma base para crescer em arquitetura de produto, sem misturar toda a lógica no HTML.
