// ================= VARIÁVEIS INICIAIS =================

// pega a div onde os produtos serão renderizados
const lista = document.getElementById("listaProdutos");

// pega o carrinho salvo no localStorage ou inicia vazio
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// total de itens (corrigido depois)
let totalItens = JSON.parse(localStorage.getItem("totalItens")) ?? 0;

// controla quantidade de cada produto na tela
let quantidades = {};


// ================= INICIALIZAÇÃO =================
atualizarBotaoCarrinho();


// ================= RENDERIZAÇÃO DOS PRODUTOS =================
produtos.forEach(produto => {

    // 1. Cria o card do produto
    const div = document.createElement("div");
    div.classList.add("produto");
    div.id = produto.id;

    // 2. Define a quantidade inicial no objeto 'quantidades' (Lógica do segundo código)
    if (!quantidades[produto.id]) {
        quantidades[produto.id] = 1;
    }

    // 3. Estrutura HTML do produto (Unindo o Slider com a exibição da Quantidade)
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
        <p>R$ ${produto.preco.toFixed(2)}</p>
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

    // 4. Adiciona o card à lista na tela
    lista.appendChild(div);
});

// ================= ADICIONAR AO CARRINHO =================
function addCarrinho(id) {

    const produto = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(p => p.id === id);

    if (itemExistente) {
        // soma quantidade se já existe
        itemExistente.quantidade += quantidades[id];
    } else {
        // adiciona novo item
        carrinho.push({
            ...produto,
            quantidade: quantidades[id]
        });
    }

    // salva no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarBotaoCarrinho();
}


// ================= ATUALIZA BOTÃO DO CARRINHO =================
function atualizarBotaoCarrinho() {

    // soma total de itens corretamente (ANTES estava errado)
    totalItens = carrinho.length;
    document.getElementById("botaoCarrinho").innerHTML =
        `<i class="mdi mdi-cart-outline"></i>${totalItens}`;

    // ✅ CORREÇÃO: aqui era getItem, agora é setItem
    localStorage.setItem("totalItens", JSON.stringify(totalItens));
}


// ================= CONTROLE DE QUANTIDADE =================
function AddQuantidade(id) {

    quantidades[id]++;

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

// slider card
document.querySelectorAll(".produto").forEach(card => {

    const slides = card.querySelector(".slides");
    const slide = card.querySelectorAll(".slide");
    const next = card.querySelector(".next");
    const prev = card.querySelector(".prev");

    let index = 0;
    let animando = false; // 🔥 AQUI

    function updateSlide() {



        if (animando) return; // 🔥 BLOQUEIA CLIQUE DUPLO

        animando = true;

        const largura = card.querySelector(".espacoImg").offsetWidth;
        slides.style.transform = `translateX(${-largura * index}px)`;

        setTimeout(() => {
            animando = false;
        }, 400); // mesmo tempo do CSS
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