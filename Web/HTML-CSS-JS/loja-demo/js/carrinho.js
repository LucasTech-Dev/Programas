// ============================================================
// carrinho.js — página carrinho.html
// ============================================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const listaEl     = document.getElementById("listaCarrinho");
const qtdEl       = document.getElementById("quantidadeNoCarrinho");
const totalResumo = document.getElementById("totalResumo");

// ── Init ──────────────────────────────────────────────────
renderCarrinho();

// ── Render ────────────────────────────────────────────────
function renderCarrinho() {
  listaEl.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    listaEl.innerHTML = `
      <div class="empty-state">
        <i class="mdi mdi-cart-off"></i>
        <p>Seu carrinho está vazio.</p>
        <a href="index.html" class="btn-primary" style="margin-top:1rem">Ver produtos</a>
      </div>`;
    atualizarHeader(0);
    atualizarTotalResumo(0);
    return;
  }

  carrinho.forEach((prod, i) => {
    const preco    = Number(prod.preco);
    const qtd      = Number(prod.quantidade);
    const subtotal = preco * qtd;
    total += subtotal;

    const imgs = prod.imagens || (prod.imagem ? [prod.imagem] : []);

    const card = document.createElement("div");
    card.classList.add("produto");

    card.innerHTML = `
      <div class="espacoImg">
        <div class="slider">
          <div class="slides">
            ${imgs.map(src => `
              <div class="slide">
                <img src="${src}" alt="${prod.nome}" loading="lazy">
              </div>`).join("")}
          </div>
          ${imgs.length > 1 ? `
          <button class="prev" aria-label="Anterior">❮</button>
          <button class="next" aria-label="Próximo">❯</button>` : ""}
        </div>
      </div>

      <div class="espacoNomeProduto">
        <h3>${prod.nome}</h3>
        <p class="preco">R$ ${preco.toFixed(2)}</p>
        <p class="subtotal-item">Subtotal: <strong>R$ ${subtotal.toFixed(2)}</strong></p>
      </div>

      <div class="botoesQuantidade">
        <button onclick="subQtd(${i})">−</button>
        <span>${qtd}</span>
        <button onclick="addQtd(${i})">+</button>
      </div>

      <div class="espacoBtnAdd">
        <button class="btn-remover" onclick="removerItem(${i})">
          <i class="mdi mdi-close"></i> Remover
        </button>
      </div>
    `;

    listaEl.appendChild(card);
  });

  atualizarHeader(carrinho.reduce((a, it) => a + it.quantidade, 0));
  atualizarTotalResumo(total);
  localStorage.setItem("totalCompra", JSON.stringify(total));
  initSliders(listaEl);
}

// ── Quantidade ────────────────────────────────────────────
function addQtd(i) {
  carrinho[i].quantidade++;
  salvar();
}

function subQtd(i) {
  carrinho[i].quantidade--;
  if (carrinho[i].quantidade <= 0) carrinho.splice(i, 1);
  salvar();
}

// ── Remoção ───────────────────────────────────────────────
function removerItem(i) {
  carrinho.splice(i, 1);
  salvar();
}

function limparCarrinho() {
  if (!confirm("Deseja limpar o carrinho?")) return;
  carrinho = [];
  salvar();
}

// ── Salvar ────────────────────────────────────────────────
function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
}

// ── Header ────────────────────────────────────────────────
function atualizarHeader(total) {
  if (qtdEl) qtdEl.textContent = total;
  localStorage.setItem("totalItens", JSON.stringify(total));
}

function atualizarTotalResumo(total) {
  if (totalResumo) {
    totalResumo.innerHTML = `Total: <strong>R$ ${total.toFixed(2)}</strong>`;
  }
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

    btnNext.addEventListener("click", () => goTo(idx + 1));
    btnPrev.addEventListener("click", () => goTo(idx - 1));
  });
}
