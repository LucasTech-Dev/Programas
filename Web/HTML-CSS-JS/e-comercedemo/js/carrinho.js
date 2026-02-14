let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const listaCarrinho = document.getElementById("listaCarrinho");
let quantidadeNoCarrinho = document.getElementById("quantidadeNoCarrinho");

let totalItens =JSON.parse(localStorage.getItem("totalItens")) ?? 0


// =====================
// RENDER
// =====================
function renderCarrinho() {

  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((prod, index) => {

    const subtotal = prod.preco * prod.quantidade;
    total += subtotal;

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
          <button onclick="diminuirQuantidade(${index})">-</button>
          <p>${prod.quantidade}</p>
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

  // TOTAL FINAL
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("totalCarrinho");
  totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
  listaCarrinho.appendChild(totalDiv);

  atualizarHeader();
}


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


function removerItem(index) {
  carrinho.splice(index, 1);
  salvar();
}


function limparCarrinho() {
  carrinho = [];
  salvar();
}


function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
}

function atualizarHeader() {

   totalItens = carrinho.length;

  quantidadeNoCarrinho.innerHTML =
    `${totalItens} itens no carrinho`;

    localStorage.getItem("totalItens", JSON.stringify(totalItens));
}

renderCarrinho();
