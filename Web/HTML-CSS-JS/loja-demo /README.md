# Loja Demo — Catálogo Gráfica

Catálogo de produtos com painel admin integrado ao GitHub + deploy automático via Cloudflare Pages.

---

## Estrutura

```
/
├── index.html          ← Catálogo (loja)
├── busc.html           ← Busca de produtos
├── carrinho.html       ← Carrinho + finalizar pedido
│
├── admin/
│   ├── index.html      ← Login do painel admin
│   └── produtos.html   ← Painel de gerenciamento
│
├── data/
│   └── produtos.json   ← Fonte de verdade dos produtos ✅
│
├── js/
│   ├── loja.js         ← Lógica da loja (fetch do JSON)
│   ├── pesquisa.js     ← Busca em tempo real
│   ├── carrinho.js     ← Gerenciamento do carrinho
│   └── whatsapp.js     ← Finalização via WhatsApp
│
├── style/
│   └── loja.css        ← Estilos globais
│
└── img/                ← Imagens dos produtos
```

---

## Como funciona (Opção 2)

```
Painel Admin (admin/produtos.html)
        ↓
  GitHub API (PUT /contents)
        ↓
  data/produtos.json atualizado
        ↓
  Cloudflare Pages detecta commit
        ↓
  Deploy automático (~30s a 2min)
        ↓
  Loja atualizada para todos
```

---

## Setup no Cloudflare Pages

1. Faça push deste projeto para um repositório GitHub.
2. No Cloudflare Pages → "Create a Project" → conecte o repositório.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(deixe vazio)*
   - **Build output directory:** `/` (raiz)
4. Clique em "Save and Deploy".

A cada `git push` (ou quando o painel admin publicar), o Cloudflare fará um novo deploy automaticamente.

---

## Primeiro acesso ao painel admin

1. Acesse `seu-site.pages.dev/admin`
2. Gere um token no GitHub:
   - Settings → Developer settings → Personal access tokens → Fine-grained tokens
   - Repository access: selecione este repositório
   - Permissions → Contents: **Read and Write**
3. Preencha: usuário GitHub, nome do repositório, token
4. Clique em **Entrar no painel**

O token fica salvo apenas no `localStorage` do seu navegador.

---

## Fluxo do painel admin

1. O painel carrega `data/produtos.json` direto da GitHub API
2. Você adiciona, edita ou remove produtos na interface
3. Clica em **Publicar no GitHub**
4. O arquivo `produtos.json` é atualizado via `PUT /repos/.../contents`
5. O Cloudflare detecta o novo commit e faz deploy automático
6. Em até 2 minutos a loja está atualizada

---

## WhatsApp

Troque o número em `js/whatsapp.js`:

```js
const numero = "5551999999999"; // DDD + número (sem + ou espaços)
```

---

## Adicionando imagens de produtos

1. Faça upload das imagens na pasta `img/` do repositório
2. No painel admin, ao criar/editar um produto, informe o caminho:  
   `img/nome-da-imagem.webp`
