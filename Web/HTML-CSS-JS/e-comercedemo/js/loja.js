const lista = document.getElementById("listaProdutos"); // pega a div mo html e passa pra dentro da variavel

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []; //pega um elemento como carrinho no localStorege, se nao houver item salvo começa um array vazio
let contador = JSON.parse(localStorage.getItem("contador")) ?? 0;

conteudo = `<a  href="carrinho.html" id="botaoCarrinho" class="btn-carrinho"><i class="mdi mdi-cart-outline"></i>${contador} Ver Carrinho </a>`
botaoCarrinho.innerHTML = conteudo;

produtos.forEach(produto => { //percorre todos os itens do arrey produto

    const div = document.createElement("div"); //cria uma div html dentro da variavel js

    div.classList.add("produto");// passa uma classe css para esta div

    div.innerHTML = ` 
            <div class="espacoImg">
                <img src="${produto.imagem}">
            </div>
            <div class="espacoNomeProduto">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
            </div>

             <div class="botoesQuantidade">
                <button>-</button> <p id="quantidadeProduto">0</p> <button>+</button>
             </div>

            <div class="espacoBtnAdd">
                <button onclick="addCarrinho(${produto.id})">Adicionar</button>
            </div>
        `

    lista.appendChild(div);
});


function addCarrinho(id) { //cria a função que recebe p id do produto clicado
    contador++
    let conteudo

    let botaoCarrinho = document.getElementById("botaoCarrinho");
   // conteudo = botaoCarrinho.value;

    botaoCarrinho.innerHTML = "";
    conteudo = `<a  href="carrinho.html" id="botaoCarrinho" class="btn-carrinho"><i class="mdi mdi-cart-outline"></i>${contador} Ver Carrinho </a>`

    botaoCarrinho.innerHTML = conteudo;
    const produto = produtos.find(p => p.id === id); //produtos.find(procura por um produto especifico)  (p=> p.id===id) compara o id do produto procurado com o id encontrado, fazemndo assim buscar o obj por completo. genial.

    carrinho.push(produto); // puxa o OBJ produto pra dentro do array carrinho

    localStorage.setItem("contador", JSON.stringify(contador));
    localStorage.setItem("carrinho", JSON.stringify(carrinho)); //passa os itens para string para salvar no localStorege como carrinho


} 