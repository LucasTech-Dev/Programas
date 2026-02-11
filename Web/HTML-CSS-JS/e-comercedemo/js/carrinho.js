
const listaCarrinho = document.getElementById("listaCarrinho");
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let contador = JSON.parse(localStorage.getItem ("contador")) ?? 0

function voltarPagina() {
    window.history.go(-1);
}


function limparCarrinho() {
  localStorage.removeItem("carrinho");
  carrinho = [];
  contador =0;
  localStorage.setItem("contador", JSON.stringify(contador))
  renderCarrinho();
  
}

function removerItem(index) {
  carrinho.splice(index, 1); // remove pelo índice
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  contador= contador-1;
  localStorage.setItem("contador", JSON.stringify(contador))
  renderCarrinho();

}

function renderCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((prod, index) => {
    total += prod.preco;

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="produto">
        <div class="espacoImg">
          <img src="${prod.imagem}">
        </div>

        <div class="espacoNomeProduto">
          <h3>${prod.nome}</h3>
          <p>R$ ${prod.preco.toFixed(2)}</p>
        </div>

        <div class="botoesQuantidade">
                <button>-</button> <p id="quantidadeProduto">0</p> <button>+</button>
             </div>

        <div class="espacoBtnAdd">
          <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
        </div>
      </div>
    `;

    listaCarrinho.appendChild(div);
  });

  // TOTAL
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("totalCarrinho");
  totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
  listaCarrinho.appendChild(totalDiv);
}

renderCarrinho();

