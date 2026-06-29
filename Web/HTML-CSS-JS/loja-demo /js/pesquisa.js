// ============================================================
// pesquisa.js — página busc.html
// Busca produtos do Firestore e usa seed local se estiver offline.
// ============================================================

import { listarProdutosLojaDemo, produtosDemo } from "./firebase-lojas.service.js";

const listaBusca  = document.getElementById("listaBusca");
const searchInput = document.getElementById("searchInput");
const loadingEl   = document.getElementById("loadingState");
const headerBadge = document.getElementById("totalCarrinhoHeader");
const STORAGE_CART = "carrinho";
const STORAGE_TOTAL = "totalItens";

let produtos    = [];
let carrinho    = JSON.parse(localStorage.getItem(STORAGE_CART)) || [];
let quantidades = {};

atualizarHeaderBadge();
carregarProdutos();

async function carregarProdutos() {
  try {
    produtos = await listarProdutosLojaDemo();
  } catch (err) {
    console.warn("Firestore indisponível. Usando produtos demo locais temporariamente.", err);
    produtos = produtosDemo.map(p => ({ ...p, ativo: p.ativo !== false }));
  }

  loadingEl.style.display  = "none";
  listaBusca.style.display = "grid";
  renderBusca(produtos);
}

searchInput.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase().trim();
  const filtrados = val
    ? produtos.filter(p => p.nome.toLowerCase().includes(val))
    : produtos;
  renderBusca(filtrados);
});

function renderBusca(lista) {
  listaBusca.innerHTML = "";

  if (lista.length === 0) {
    listaBusca.innerHTML = `
      <div class="empty-state">
        <i class="mdi mdi-package-variant-closed"></i>
        <p>Nenhum produto encontrado.</p>
      </div>`;
    return;
  }

  lista.filter(produto => produto.ativo !== false).forEach((produto, i) => {
    const id = String(produto.id);
    if (!quantidades[id]) quantidades[id] = 1;

    const card = document.createElement("div");
    card.classList.add("produto");
    card.style.animationDelay = `${i * 60}ms`;

    const imgs = produto.imagens?.length ? produto.imagens : [produto.imagem].filter(Boolean);
    const precoAtual = produto.precoPromocional || produto.preco;

    card.innerHTML = `
      <div class="espacoImg">
        <div class="slider">
          <div class="slides">
            ${imgs.map(src => `
              <div class="slide">
                <img src="${src}" alt="${produto.nome}" loading="lazy">
              </div>`).join("")}
          </div>
          ${imgs.length > 1 ? `
          <button type="button" class="prev" aria-label="Anterior">❮</button>
          <button type="button" class="next" aria-label="Próximo">❯</button>` : ""}
        </div>
        ${produto.categoria ? `<span class="badge">${produto.categoria}</span>` : ""}
      </div>

      <div class="espacoNomeProduto">
        <h3>${produto.nome}</h3>
        ${produto.descricao ? `<p>${produto.descricao}</p>` : ""}
        <p class="preco">R$ ${Number(precoAtual).toFixed(2)}</p>
      </div>

      <div class="botoesQuantidade">
        <button data-action="sub" data-id="${id}">−</button>
        <span id="qtd_${id}">${quantidades[id]}</span>
        <button data-action="add" data-id="${id}">+</button>
      </div>

      <div class="espacoBtnAdd">
        <button data-action="obs" data-id="${id}">
          <i class="mdi mdi-cart-plus"></i> Adicionar
        </button>
      </div>
    `;

    card.addEventListener("click", () => abrirObsRapida(id));
    card.querySelectorAll("button[data-action]").forEach(btn => {
      btn.addEventListener("click", event => {
        event.stopPropagation();
        const action = btn.dataset.action;
        if (action === "add") addQtd(id);
        if (action === "sub") subQtd(id);
        if (action === "obs") abrirObsRapida(id);
      });
    });

    listaBusca.appendChild(card);
  });

  initSliders(listaBusca);
}

function addQtd(id) {
  quantidades[id] = (quantidades[id] || 1) + 1;
  document.getElementById(`qtd_${id}`).textContent = quantidades[id];
}

function subQtd(id) {
  if ((quantidades[id] || 1) > 1) quantidades[id]--;
  document.getElementById(`qtd_${id}`).textContent = quantidades[id];
}

function abrirObsRapida(id) {
  const produto = produtos.find(p => String(p.id) === String(id));
  if (!produto) return;

  abrirModalObservacao(produto, quantidades[id] || 1, (qtdFinal, observacao) => {
    addCarrinho(id, qtdFinal, observacao);
    quantidades[id] = 1;
    const el = document.getElementById(`qtd_${id}`);
    if (el) el.textContent = 1;
  });
}

function addCarrinho(id, qtd, observacao) {
  const produto = produtos.find(p => String(p.id) === String(id));
  const existente = carrinho.find(p => String(p.id) === String(id) && (p.observacao || "") === (observacao || ""));

  if (existente) existente.quantidade += qtd;
  else carrinho.push({ ...produto, quantidade: qtd, observacao: observacao || "" });

  localStorage.setItem(STORAGE_CART, JSON.stringify(carrinho));
  atualizarHeaderBadge();
  mostrarToast(observacao ? `"${produto.nome}" adicionado com observação!` : `"${produto.nome}" adicionado!`);
}

function atualizarHeaderBadge() {
  const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  if (headerBadge) headerBadge.textContent = total;
  localStorage.setItem(STORAGE_TOTAL, JSON.stringify(total));
}

function mostrarToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("toast--show"));
  setTimeout(() => {
    t.classList.remove("toast--show");
    setTimeout(() => t.remove(), 300);
  }, 2000);
}

function initSliders(container) {
  container.querySelectorAll(".slider").forEach(slider => {
    const slides    = slider.querySelector(".slides");
    const allSlides = slider.querySelectorAll(".slide");
    const btnNext   = slider.querySelector(".next");
    const btnPrev   = slider.querySelector(".prev");
    if (!btnNext || allSlides.length <= 1) return;

    let idx = 0, animando = false;

    function goTo(n) {
      if (animando) return;
      animando = true;
      idx = (n + allSlides.length) % allSlides.length;
      slides.style.transform = `translateX(${-slider.offsetWidth * idx}px)`;
      setTimeout(() => (animando = false), 400);
    }

    btnNext.addEventListener("click", e => { e.stopPropagation(); goTo(idx + 1); });
    btnPrev.addEventListener("click", e => { e.stopPropagation(); goTo(idx - 1); });
  });
}
