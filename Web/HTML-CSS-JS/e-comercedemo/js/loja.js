const lista = document.getElementById("listaProdutos");
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

produtos.forEach(produto => {
  const div = document.createElement("div"); //cria uma div html dentro da variavel js
  div.classList.add("produto");// passa uma classe css para esta div

  div.innerHTML = `
     <img src="${produto.imagem}">
    <h3>${produto.nome}</h3>
    <p>R$ ${produto.preco.toFixed(2)}</p>
    <button onclick="addCarrinho(${produto.id})">Adicionar</button>
  `;

  lista.appendChild(div);
});

function addCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado!");
}