function finalizarPedido() {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const pagamento = document.getElementById("pagamento").value;
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  let mensagem = `Pedido:%0A`;

  carrinho.forEach(p => {
    mensagem += `- ${p.nome} R$ ${p.preco.toFixed(2)}%0A`;
  });

  mensagem += `%0ACliente: ${nome}%0AEndereço: ${endereco}%0APagamento: ${pagamento}`;

  const numero = "5551995310123"; // troque pelo número real

  const url = `https://wa.me/${numero}?text=${mensagem}`;
  window.open(url, "_blank");
} 