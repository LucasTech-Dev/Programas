const listaCarrinho = document.getElementById("listaCarrinho");
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function renderCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach(prod => {
    total += prod.preco;
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `${prod.nome} - R$ ${prod.preco.toFixed(2)}`;
    listaCarrinho.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("total");
  totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
  listaCarrinho.appendChild(totalDiv);
}

renderCarrinho();
