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

    listaCarrinho.innerHTML = ""; // limpa tela
    let total = 0; // total da compra

    carrinho.forEach((prod, index) => {

        const preco = Number(prod.preco);
        const quantidade = Number(prod.quantidade);

        const subtotal = preco * quantidade;
        total += subtotal;

        const div = document.createElement("div");

        div.innerHTML = `
            <div class="produto">

                <div class="espacoImg">
                    <img src="${prod.imagem}">
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

                <p><strong>Subtotal: R$ ${subtotal.toFixed(2)}</strong></p>

                <div class="espacoBtnAdd">
                    <button class="btn-remover" onclick="removerItem(${index})">
                        Remover
                    </button>
                </div>

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

    // ✅ CORREÇÃO: salvando total corretamente
    localStorage.setItem("totalCompra", JSON.stringify(total));
}


// ================= CONTROLE DE QUANTIDADE =================
function aumentarQuantidade(index) {
    carrinho[index].quantidade++;
    salvar();
}

function diminuirQuantidade(index) {

    carrinho[index].quantidade--;

    // remove se chegar a 0
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


// ================= HEADER (CONTADOR) =================
function atualizarHeader() {

    // ✅ CORREÇÃO: soma real das quantidades
    totalItens = carrinho.length;

    if (quantidadeNoCarrinho) {
        quantidadeNoCarrinho.innerHTML = `${totalItens} itens`;
    }

    localStorage.setItem("totalItens", JSON.stringify(totalItens));
}


// ================= INICIALIZAÇÃO =================
renderCarrinho();