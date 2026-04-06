// ================= VARIÁVEIS =================

// elementos da tela
const listaBusca = document.getElementById("listaBusca");
const searchInput = document.getElementById("searchInput");
const quantidadeNoCarrinho = document.getElementById("quantidadeNoCarrinho");

// dados do sistema
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let totalItens = JSON.parse(localStorage.getItem("totalItens")) ?? 0;

// controle de quantidade por produto
let quantidades = {};


// ================= INICIALIZAÇÃO =================
atualizarHeader();


// ================= RENDERIZAÇÃO DA BUSCA =================
function renderizarBusca(lista) {

    listaBusca.innerHTML = "";

    if (lista.length === 0) {
        listaBusca.innerHTML = "<p>Nenhum produto encontrado</p>";
        return;
    }

    lista.forEach(produto => {

        if (!quantidades[produto.id]) {
            quantidades[produto.id] = 1;
        }

        const div = document.createElement("div");
        div.classList.add("produto");

        div.innerHTML = `
            <div class="espacoImg">
                <div class="slider">
                    <div class="slides">
                        ${(produto.imagens || [produto.imagem]).map(img => `
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
                <h3>${produto.nome}</h3>
                <p>R$ ${Number(produto.preco).toFixed(2)}</p>
            </div>

            <div class="botoesQuantidade">
                <button onclick="SubQuantidade(${produto.id})">-</button>

                <p id="quantidadeProduto_${produto.id}">
                    ${quantidades[produto.id]}
                </p>

                <button onclick="AddQuantidade(${produto.id})">+</button>
            </div>

            <div class="espacoBtnAdd">
                <button onclick="addCarrinho(${produto.id})">
                    Adicionar
                </button>
            </div>
        `;

        listaBusca.appendChild(div);
    });

    // 🔥 IMPORTANTE: iniciar slider após render
    initSlider();
}


// ================= FILTRO =================
searchInput.addEventListener("input", () => {

    const valor = searchInput.value.toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(valor)
    );

    renderizarBusca(filtrados);
});


// ================= ADICIONAR AO CARRINHO =================
function addCarrinho(id) {

    const produto = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(p => p.id === id);

    const quantidadeSelecionada = quantidades[id] || 1;

    if (itemExistente) {
        itemExistente.quantidade += quantidadeSelecionada;
    } else {
        carrinho.push({
            ...produto,
            quantidade: quantidadeSelecionada
        });
    }

    quantidades[id] = 1;

    salvarCarrinho();
}


// ================= SALVAR =================
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarBotaoCarrinho();
}


// ================= BOTÃO CARRINHO =================
function atualizarBotaoCarrinho() {

    totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    const botao = document.getElementById("botaoCarrinho");

    if (botao) {
        botao.innerHTML =
            `<i class="mdi mdi-cart-outline"></i> ${totalItens}`;
    }

    localStorage.setItem("totalItens", JSON.stringify(totalItens));

    atualizarHeader();
}


// ================= CONTROLE DE QUANTIDADE =================
function AddQuantidade(id) {

    quantidades[id] = (quantidades[id] || 1) + 1;

    document.getElementById("quantidadeProduto_" + id).innerHTML =
        quantidades[id];
}

function SubQuantidade(id) {

    if (quantidades[id] > 1) {
        quantidades[id]--;
    }

    document.getElementById("quantidadeProduto_" + id).innerHTML =
        quantidades[id];
}


// ================= HEADER =================
function atualizarHeader() {

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