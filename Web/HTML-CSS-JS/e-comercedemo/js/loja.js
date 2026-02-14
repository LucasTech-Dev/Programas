const lista = document.getElementById("listaProdutos"); // pega a div mo html e passa pra dentro da variavel
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []; //pega um elemento como carrinho no localStorege, se nao houver item salvo começa um array vazio
let totalItens =JSON.parse(localStorage.getItem("totalItens")) ?? 0



let quantidades = {};






conteudo = `<a  href="carrinho.html" id="botaoCarrinho" class="btn-carrinho"><i class="mdi mdi-cart-outline"></i>${totalItens} Ver Carrinho </a>`
botaoCarrinho.innerHTML = conteudo;

produtos.forEach(produto => { //percorre todos os itens do arrey produto

    const div = document.createElement("div"); //cria uma div html dentro da variavel js

    div.classList.add("produto");// passa uma classe css para esta div
    div.id = produto.id

    if (!quantidades[produto.id]) {
    quantidades[produto.id] = 1;
}


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
                <button onclick="addCarrinho(${produto.id})">Adicionar</button>
            </div>
        `

    lista.appendChild(div);
});


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

function atualizarBotaoCarrinho() {

     totalItens = carrinho.length;


    document.getElementById("botaoCarrinho").innerHTML =
      `<i class="mdi mdi-cart-outline"></i>${totalItens} Ver Carrinho`;

      localStorage.getItem("totalItens", JSON.stringify(totalItens));
}


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
