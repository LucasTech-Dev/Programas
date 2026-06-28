// ============================================================
// pesquisa.js — página busc.html
// Clique no card abre modal de observação.
// ============================================================

const listaBusca  = document.getElementById("listaBusca");
const searchInput = document.getElementById("searchInput");
const loadingEl   = document.getElementById("loadingState");
const headerBadge = document.getElementById("totalCarrinhoHeader");
const STORAGE_CART = "carrinhoRestaurante";
const STORAGE_TOTAL = "totalItensRestaurante";

let produtos    = [];
let carrinho    = JSON.parse(localStorage.getItem(STORAGE_CART)) || [];
let quantidades = {};

// ── Init ──────────────────────────────────────────────────
atualizarHeaderBadge();
carregarProdutos();

// ── Fetch ─────────────────────────────────────────────────
async function carregarProdutos() {
  try {
    produtos = window.ProdutoService
      ? await ProdutoService.listar()
      : await (await fetch("data/produtos.json")).json();

    loadingEl.style.display  = "none";
    listaBusca.style.display = "grid";

    renderBusca(produtos);
  } catch (err) {
    loadingEl.innerHTML = `<p style="color:#DC2626">Erro ao carregar pratos.</p>`;
    console.error(err);
  }
}

// ── Filtro em tempo real ──────────────────────────────────
searchInput.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase().trim();
  const filtrados = val
    ? produtos.filter(p => p.nome.toLowerCase().includes(val))
    : produtos;
  renderBusca(filtrados);
});

// ── Render ────────────────────────────────────────────────
function renderBusca(lista) {
  listaBusca.innerHTML = "";

  if (lista.length === 0) {
    listaBusca.innerHTML = `
      <div class="empty-state">
        <i class="mdi mdi-package-variant-closed"></i>
        <p>Nenhum prato encontrado.</p>
      </div>`;
    return;
  }

  lista.forEach((produto, i) => {
    if (!quantidades[produto.id]) quantidades[produto.id] = 1;

    const card = document.createElement("div");
    card.classList.add("produto");
    card.style.animationDelay = `${i * 60}ms`;

    const imgs = produto.imagens || [produto.imagem];

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
          <button class="prev" aria-label="Anterior">❮</button>
          <button class="next" aria-label="Próximo">❯</button>` : ""}
        </div>
        ${produto.categoria ? `<span class="badge">${produto.categoria}</span>` : ""}
      </div>

      <div class="espacoNomeProduto">
        <h3>${produto.nome}</h3>
        <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
      </div>

      <div class="botoesQuantidade">
        <button onclick="event.stopPropagation(); subQtd(${produto.id})">−</button>
        <span id="qtd_${produto.id}">${quantidades[produto.id]}</span>
        <button onclick="event.stopPropagation(); addQtd(${produto.id})">+</button>
      </div>

      <div class="espacoBtnAdd">
        <button onclick="event.stopPropagation(); abrirObsRapida(${produto.id})">
          <i class="mdi mdi-cart-plus"></i> Adicionar
        </button>
      </div>
    `;

    card.addEventListener("click", () => abrirObsRapida(produto.id));

    listaBusca.appendChild(card);
  });

  initSliders(listaBusca);
}

// ── Quantidade ────────────────────────────────────────────
function addQtd(id) {
  quantidades[id] = (quantidades[id] || 1) + 1;
  document.getElementById(`qtd_${id}`).textContent = quantidades[id];
}

function subQtd(id) {
  if ((quantidades[id] || 1) > 1) quantidades[id]--;
  document.getElementById(`qtd_${id}`).textContent = quantidades[id];
}

// ── Abre o modal de observação ────────────────────────────
function abrirObsRapida(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  const qtdAtual = quantidades[id] || 1;

  abrirModalObservacao(produto, qtdAtual, (qtdFinal, observacao) => {
    addCarrinho(id, qtdFinal, observacao);
    quantidades[id] = 1;
    const el = document.getElementById(`qtd_${id}`);
    if (el) el.textContent = 1;
  });
}

// ── Adicionar (com observação) ────────────────────────────
function addCarrinho(id, qtd, observacao) {
  const produto = produtos.find(p => p.id === id);

  const existente = carrinho.find(p =>
    p.id === id && (p.observacao || "") === (observacao || "")
  );

  if (existente) {
    existente.quantidade += qtd;
  } else {
    carrinho.push({
      ...produto,
      quantidade: qtd,
      observacao: observacao || ""
    });
  }

  localStorage.setItem(STORAGE_CART, JSON.stringify(carrinho));
  atualizarHeaderBadge();

  const msg = observacao
    ? `"${produto.nome}" adicionado com observação!`
    : `"${produto.nome}" adicionado!`;
  mostrarToast(msg);
}

// ── Header badge ──────────────────────────────────────────
function atualizarHeaderBadge() {
  const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  if (headerBadge) headerBadge.textContent = total;
  localStorage.setItem(STORAGE_TOTAL, JSON.stringify(total));
}

// ── Toast ─────────────────────────────────────────────────
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

// ── Slider ────────────────────────────────────────────────
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

    btnNext.addEventListener("click", e => {
      e.stopPropagation();
      goTo(idx + 1);
    });
    btnPrev.addEventListener("click", e => {
      e.stopPropagation();
      goTo(idx - 1);
    });
  });
}
