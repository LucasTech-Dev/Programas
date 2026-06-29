// ============================================================
// modal.js — Modal de observações do produto
// Compartilhado entre index.html e busc.html
// ============================================================

let _modalProdutoAtual = null;
let _modalQtdAtual = 1;
let _modalOnConfirm = null;

// ── Injeta o HTML do modal no body (uma vez) ──────────────
function initModalObservacao() {
  if (document.getElementById("modalObservacao")) return;

  const div = document.createElement("div");
  div.innerHTML = `
    <div id="modalObservacao" class="modal-obs-overlay">
      <div class="modal-obs">
        <button class="modal-obs__close" onclick="fecharModalObservacao()">
          <i class="mdi mdi-close"></i>
        </button>

        <div class="modal-obs__img" id="modalObsImg"></div>

        <div class="modal-obs__body">
          <h3 id="modalObsNome">Produto</h3>
          <p class="modal-obs__preco" id="modalObsPreco">R$ 0,00</p>

          <div class="modal-obs__qtd">
            <button onclick="_modalSubQtd()">−</button>
            <span id="modalObsQtd">1</span>
            <button onclick="_modalAddQtd()">+</button>
          </div>

          <label class="modal-obs__label" for="modalObsTexto">
            Alguma observação? <span>(opcional)</span>
          </label>
          <textarea
            id="modalObsTexto"
            class="modal-obs__textarea"
            placeholder="Ex: sem cebola, ponto da carne ao meio, tirar tomate…"
            maxlength="200"
            rows="3"
          ></textarea>

          <button class="btn-primary modal-obs__confirm" onclick="_modalConfirmar()">
            <i class="mdi mdi-cart-plus"></i> Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(div.firstElementChild);

  // Fecha clicando fora
  document.getElementById("modalObservacao").addEventListener("click", e => {
    if (e.target.id === "modalObservacao") fecharModalObservacao();
  });

  // Fecha com Esc
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") fecharModalObservacao();
  });
}

// ── Abre o modal para um produto específico ───────────────
// onConfirm recebe (quantidade, observacao)
function abrirModalObservacao(produto, qtdInicial, onConfirm) {
  initModalObservacao();

  _modalProdutoAtual = produto;
  _modalQtdAtual = qtdInicial || 1;
  _modalOnConfirm = onConfirm;

  const imgs = produto.imagens || (produto.imagem ? [produto.imagem] : []);
  const imgSrc = imgs[0] || "";

  document.getElementById("modalObsImg").innerHTML = imgSrc
    ? `<img src="${imgSrc}" alt="${produto.nome}">`
    : "";
  document.getElementById("modalObsNome").textContent = produto.nome;
  document.getElementById("modalObsPreco").textContent =
    `R$ ${Number(produto.preco).toFixed(2)}`;
  document.getElementById("modalObsQtd").textContent = _modalQtdAtual;
  document.getElementById("modalObsTexto").value = "";

  document.getElementById("modalObservacao").classList.add("open");
  document.body.style.overflow = "hidden";

  setTimeout(() => document.getElementById("modalObsTexto").focus(), 150);
}

function fecharModalObservacao() {
  const modal = document.getElementById("modalObservacao");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
  _modalProdutoAtual = null;
  _modalOnConfirm = null;
}

function _modalAddQtd() {
  _modalQtdAtual++;
  document.getElementById("modalObsQtd").textContent = _modalQtdAtual;
}

function _modalSubQtd() {
  if (_modalQtdAtual > 1) _modalQtdAtual--;
  document.getElementById("modalObsQtd").textContent = _modalQtdAtual;
}

function _modalConfirmar() {
  const observacao = document.getElementById("modalObsTexto").value.trim();
  if (_modalOnConfirm) _modalOnConfirm(_modalQtdAtual, observacao);
  fecharModalObservacao();
}
