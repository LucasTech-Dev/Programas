// ============ SISTEMA DE CARRINHO DE COMPRAS ============

// Cria carrinho no localStorage caso ainda não exista
if (!localStorage.getItem("carrinho")) {
  localStorage.setItem("carrinho", JSON.stringify([]));
}

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(nome, preco, imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho"));

  // Verifica se o produto já está no carrinho
  const existente = carrinho.find(item => item.nome === nome);
  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ nome, preco, imagem, quantidade: 1 });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  alert(`${nome} foi adicionado ao carrinho!`);
}

// Captura todos os botões "Adicionar ao carrinho"
document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".cards button");

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".cards");
      const nome = card.querySelector("p").innerText;
      const preco = card.querySelector("h2").innerText;
      const imagem = card.querySelector("img").src;
      adicionarAoCarrinho(nome, preco, imagem);
    });
  });

  atualizarContadorCarrinho();
});

// ============ FUNÇÕES DO CARRINHO (usadas em carrinho.html) ============

// Atualiza o contador do ícone do carrinho
function atualizarContadorCarrinho() {
  const contador = document.getElementById("cart-count");
  if (!contador) return; // evita erro se não existir o contador
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  contador.textContent = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);
}

// Remove item do carrinho pelo índice
function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();

  // Atualiza a exibição se estiver na página do carrinho
  if (typeof atualizarCarrinho === "function") {
    atualizarCarrinho();
  }
}

// Finaliza a compra e limpa o carrinho
function finalizarCompra() {
  alert("Compra finalizada com sucesso! 🎉");
  localStorage.removeItem("carrinho");
  atualizarContadorCarrinho();

  if (typeof atualizarCarrinho === "function") {
    atualizarCarrinho();
  }
}
