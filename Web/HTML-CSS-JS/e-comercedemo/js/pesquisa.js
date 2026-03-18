const listaBusca = document.getElementById("listaBusca");
const searchInput = document.getElementById("searchInput");

let quantidades = {};

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
        `;

        listaBusca.appendChild(div);
    });
}

searchInput.addEventListener("input", () => {
    const valor = searchInput.value.toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(valor)
    );

    renderizarBusca(filtrados);
});