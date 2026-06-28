# Loja Demo — Catálogo Gráfica

Catálogo de produtos com painel admin integrado ao GitHub + deploy automático via Cloudflare Pages.

---

## Abrir com Live Server e criar tabelas

1. No VS Code, clique com o botão direito em `index.html` e escolha **Open with Live Server** para abrir o site.
2. Para criar/atualizar as coleções do Firebase, abra `criar-tabelas.html` também pelo Live Server.
3. Clique em **Criar/atualizar tabelas** e aguarde a mensagem de sucesso.
4. Consulte `VARREDURA.md` para ver o que está em uso e os candidatos a remoção futura.

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

---

## Posicionamento comercial para restaurantes e delivery

Este projeto deve ser apresentado como **cardápio digital com pedido organizado no WhatsApp**. A promessa principal é:

> O cliente escolhe os pratos, informa quantidades, observações, endereço e pagamento, e o restaurante recebe o pedido pronto para confirmar.

### Negócios ideais

- Restaurantes
- Lancherias
- Pizzarias
- Hamburguerias
- Pastelarias
- Cafeterias
- Açaíterias
- Marmitarias
- Delivery local

### Valores recomendados

- **Plano Essencial:** R$ 200 de criação (R$ 100 entrada + R$ 100 na entrega) + R$ 75/mês.
- **Plano Crescimento:** R$ 350 de criação + R$ 150/mês, com combos, destaques e ajustes prioritários.
- **Plano Premium:** R$ 600+ de criação + R$ 250/mês, para cardápios maiores, campanhas e manutenção mais frequente.

Restaurantes normalmente valorizam rapidez e redução de erros. Use exemplos de ticket médio: se o cardápio ajudar a gerar poucos pedidos extras por mês, ele tende a se pagar.

### Funil de abordagem

1. Abertura: “Vocês recebem mais pedidos pelo WhatsApp, iFood ou Instagram?”
2. Diagnóstico: “Vocês perdem tempo perguntando endereço, itens, sabores, adicionais e forma de pagamento?”
3. Demonstração: mostrar o fluxo de adicionar ao carrinho e finalizar pelo WhatsApp.
4. Oferta: “Posso montar uma prévia com alguns pratos para você ver como ficaria.”
5. Fechamento: R$ 100 para iniciar, R$ 100 na entrega aprovada e mensalidade a partir de R$ 75.

### Estratégia para escalar

- Use categorias fixas: mais pedidos, combos, bebidas e sobremesas.
- Incentive descrições curtas e fotos fortes para aumentar desejo.
- Crie combos e adicionais para elevar ticket médio.
- Limite alterações inclusas por mês conforme o plano.
- Reaproveite o mesmo template para reduzir tempo de implantação.
