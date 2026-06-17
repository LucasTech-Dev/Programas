// ============================================================
// loja.js — página inicial (index.html)
// Lê pratos do JSON. Clique no card abre modal de observação.
// ============================================================

const lista       = document.getElementById("listaProdutos");
const loadingEl   = document.getElementById("loadingState");
const headerBadge = document.getElementById("totalCarrinhoHeader");
const STORAGE_CART = "carrinhoRestaurante";
const STORAGE_TOTAL = "totalItensRestaurante";

let produtos    = [];
let carrinho    = JSON.parse(localStorage.getItem(STORAGE_CART)) || [];
let quantidades = {};

// ── Inicialização ─────────────────────────────────────────
atualizarHeaderBadge(); 
carregarProdutos();

// ── Busca o JSON de pratos ────────────────────────────────
async function carregarProdutos() {
  try {
    const res = await fetch("data/produtos.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    produtos = await res.json();
    renderProdutos();
  } catch (err) {
    loadingEl.innerHTML = `
      <p style="color:#DC2626">
        Erro ao carregar pratos. Verifique sua conexão.
      </p>`;
    console.error(err);
  }
}

// ── Renderiza os cards ────────────────────────────────────
function renderProdutos() {
  loadingEl.style.display = "none";
  lista.style.display     = "grid";
  lista.innerHTML         = "";

  produtos.forEach((produto, i) => {
    quantidades[produto.id] = 1;

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
        <span id="qtd_${produto.id}">1</span>
        <button onclick="event.stopPropagation(); addQtd(${produto.id})">+</button>
      </div>

      <div class="espacoBtnAdd">
        <button onclick="event.stopPropagation(); abrirObsRapida(${produto.id})">
          <i class="mdi mdi-cart-plus"></i> Adicionar
        </button>
      </div>
    `;

    // Clique em qualquer parte do card (fora dos botões) abre o modal
    card.addEventListener("click", () => abrirObsRapida(produto.id));

    lista.appendChild(card);
  });

  initSliders(lista);
}

// ── Controle de quantidade (fora do modal, no próprio card) ─
function addQtd(id) {
  quantidades[id] = (quantidades[id] || 1) + 1;
  document.getElementById(`qtd_${id}`).textContent = quantidades[id];
}

function subQtd(id) {
  if ((quantidades[id] || 1) > 1) quantidades[id]--;
  document.getElementById(`qtd_${id}`).textContent = quantidades[id];
}

// ── Abre o modal de observação para o produto ─────────────
function abrirObsRapida(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  const qtdAtual = quantidades[id] || 1;

  abrirModalObservacao(produto, qtdAtual, (qtdFinal, observacao) => {
    addCarrinho(id, qtdFinal, observacao);
    // reseta o seletor de quantidade do card
    quantidades[id] = 1;
    const el = document.getElementById(`qtd_${id}`);
    if (el) el.textContent = 1;
  });
}

// ── Adicionar ao carrinho (agora com observação) ──────────
function addCarrinho(id, qtd, observacao) {
  const produto = produtos.find(p => p.id === id);

  // Itens com observação diferente são tratados como linhas separadas,
  // para não misturar "sem cebola" com "sem observação" no mesmo item.
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

// ── Badge do header ───────────────────────────────────────
function atualizarHeaderBadge() {
  const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  if (headerBadge) headerBadge.textContent = total;
  localStorage.setItem(STORAGE_TOTAL, JSON.stringify(total));
}

// ── Toast de feedback ─────────────────────────────────────
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
