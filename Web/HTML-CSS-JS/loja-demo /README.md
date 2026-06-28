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

## Posicionamento comercial para vender o catálogo

Este projeto deve ser apresentado como **catálogo digital de pedidos via WhatsApp**, não apenas como site. A promessa principal é:

> O cliente escolhe produtos, monta o carrinho e envia o pedido completo para o WhatsApp da loja, reduzindo mensagens repetitivas e aumentando a chance de compra.

### Segmentos prioritários sem comida

Use esta demo para prospectar varejos com muitos produtos e venda consultiva:

1. Lojas de roupas
2. Lojas de calçados
3. Cosméticos, maquiagem, perfumes e skincare
4. Lojas de celular e assistência técnica
5. Pet shops
6. Móveis
7. Decoração
8. Floriculturas
9. Presentes
10. Papelarias
11. Óticas
12. Bijuterias e acessórios
13. Materiais de construção pequenos
14. Autopeças
15. Bicicletas
16. Eletrônicos
17. Colchões
18. Utilidades domésticas
19. Esportes
20. Brinquedos

### Valores recomendados

Para manter percepção de valor e permitir escala:

- **Plano Essencial:** R$ 200 de criação (R$ 100 entrada + R$ 100 na entrega) + R$ 75/mês.
- **Plano Crescimento:** R$ 350 de criação + R$ 150/mês, incluindo prioridade de ajustes, mais produtos e melhorias de conversão.
- **Plano Premium:** R$ 600+ de criação + R$ 250/mês, para lojas com catálogo maior, campanhas sazonais e acompanhamento mais próximo.

A abordagem comercial pode começar pelo plano de R$ 75/mês para reduzir barreira de entrada, mas sempre apresente o plano de R$ 150/mês como opção recomendada para aumentar margem.

### Funil de abordagem

1. Abertura: “Vocês recebem mais pedidos pelo WhatsApp ou Instagram?”
2. Diagnóstico: “Os pedidos chegam organizados ou às vezes fica difícil acompanhar produto, quantidade e observações?”
3. Demonstração: mostrar esta loja funcionando.
4. Oferta: “Posso montar uma prévia com alguns produtos seus para você visualizar antes de decidir.”
5. Fechamento: R$ 100 para iniciar, R$ 100 na entrega aprovada e mensalidade a partir de R$ 75.

### Meta de escala para 500 clientes

Para buscar 500 clientes sem virar gargalo operacional:

- Padronize a mesma base visual e troque apenas cores, logo, produtos, WhatsApp e textos.
- Crie checklists de onboarding: logo, telefone, endereço, horários, produtos, preços e fotos.
- Limite alterações inclusas por plano para proteger o tempo de suporte.
- Use GitHub + Cloudflare Pages para publicar rápido e manter custo técnico baixo.
- Priorize nichos com alto ticket ou muitos produtos, pois percebem valor mais rápido.
