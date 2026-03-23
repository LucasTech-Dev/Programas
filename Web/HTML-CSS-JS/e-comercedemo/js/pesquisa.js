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

    // caso não encontre nada
    if (lista.length === 0) {
        listaBusca.innerHTML = "<p>Nenhum produto encontrado</p>";
        return;
    }

    lista.forEach(produto => {

        // define quantidade inicial
        if (!quantidades[produto.id]) {
            quantidades[produto.id] = 1;
        }

        const div = document.createElement("div");
        div.classList.add("produto");

        div.innerHTML = `
            <div class="espacoImg">
                <img src="${produto.imagem}">
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

        listaBusca.appendChild(div);
    });
}


// ================= FILTRO EM TEMPO REAL =================
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

    if (itemExistente) {
        itemExistente.quantidade += quantidades[id];
    } else {
        carrinho.push({
            ...produto,
            quantidade: quantidades[id]
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarBotaoCarrinho();
}


// ================= ATUALIZA BOTÃO DO CARRINHO =================
function atualizarBotaoCarrinho() {

    // ✅ CORREÇÃO: soma total real
    totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    const botao = document.getElementById("botaoCarrinho");

    if (botao) {
        botao.innerHTML =
            `<i class="mdi mdi-cart-outline"></i>${totalItens}`;
    }

    // ✅ CORREÇÃO: era getItem (errado)
    localStorage.setItem("totalItens", JSON.stringify(totalItens));

    atualizarHeader();
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


// ================= ATUALIZA HEADER =================
function atualizarHeader() {

    // ✅ soma correta
    totalItens = carrinho.length;

    if (quantidadeNoCarrinho) {
        quantidadeNoCarrinho.innerHTML =
            `${totalItens} itens `;
    }

    localStorage.setItem("totalItens", JSON.stringify(totalItens));
}