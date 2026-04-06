// ================= VARIÁVEIS =================

// pega carrinho salvo ou inicia vazio
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// elementos do HTML
const listaCarrinho = document.getElementById("listaCarrinho");
const quantidadeNoCarrinho = document.getElementById("quantidadeNoCarrinho");

// total de itens
let totalItens = JSON.parse(localStorage.getItem("totalItens")) ?? 0;


// ================= RENDER DO CARRINHO =================
function renderCarrinho() {

    listaCarrinho.innerHTML = "";
    let total = 0;

    carrinho.forEach((prod, index) => {

        const preco = Number(prod.preco);
        const quantidade = Number(prod.quantidade);

        const subtotal = preco * quantidade;
        total += subtotal;

        const div = document.createElement("div");
        div.classList.add("produto");

        div.innerHTML = `
        <div class="espacoImg">
            <div class="slider">
                <div class="slides">
                    ${(prod.imagens || [prod.imagem]).map(img => `
                        <div class="slide">
                            <img src="${img}">
                        </div>
                    `).join("")}
                </div>
                <button class="prev">❮</button>
                <button class="next">❯</button>
            </div>
        </div>

        <div class="espacoNomeProduto">
            <h3>${prod.nome}</h3>
            <p>R$ ${preco.toFixed(2)}</p>
        </div>

        <div class="botoesQuantidade">
            <button onclick="diminuirQuantidade(${index})">-</button>

            <p>${quantidade}</p>

            <button onclick="aumentarQuantidade(${index})">+</button>
        </div>

        <div class="espacoBtnAdd">
            <button onclick="removerItem(${index})">
                Remover
            </button>
        </div>
        `;

        listaCarrinho.appendChild(div);
    });

    // ================= TOTAL FINAL =================
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("totalCarrinho");
    totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    listaCarrinho.appendChild(totalDiv);

    atualizarHeader();

    localStorage.setItem("totalCompra", JSON.stringify(total));

    // 🔥 IMPORTANTE: iniciar slider após render
    initSlider();
}


// ================= CONTROLE DE QUANTIDADE =================
function aumentarQuantidade(index) {
    carrinho[index].quantidade++;
    salvar();
}

function diminuirQuantidade(index) {

    carrinho[index].quantidade--;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    salvar();
}


// ================= REMOÇÕES =================
function removerItem(index) {
    carrinho.splice(index, 1);
    salvar();
}

function limparCarrinho() {
    carrinho = [];
    salvar();
}


// ================= SALVAR E ATUALIZAR =================
function salvar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
}


// ================= HEADER (CONTADOR CORRETO) =================
function atualizarHeader() {

    // soma real das quantidades
    totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    if (quantidadeNoCarrinho) {
        quantidadeNoCarrinho.innerHTML = `${totalItens} itens`;
    }

    localStorage.setItem("totalItens", JSON.stringify(totalItens));
}


// ================= SLIDER =================
function initSlider() {

    document.querySelectorAll(".slider").forEach(card => {

        const slides = card.querySelector(".slides");
        const slide = card.querySelectorAll(".slide");
        const next = card.querySelector(".next");
        const prev = card.querySelector(".prev");

        let index = 0;
        let animando = false;

        function updateSlide() {

            if (animando) return;

            animando = true;

            const largura = card.offsetWidth;
            slides.style.transform = `translateX(${-largura * index}px)`;

            setTimeout(() => {
                animando = false;
            }, 400);
        }

        next.addEventListener("click", () => {
            index = (index + 1) % slide.length;
            updateSlide();
        });

        prev.addEventListener("click", () => {
            index = (index - 1 + slide.length) % slide.length;
            updateSlide();
        });
    });
}


// ================= INICIALIZAÇÃO =================
renderCarrinho();