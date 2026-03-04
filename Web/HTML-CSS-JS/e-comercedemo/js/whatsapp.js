function finalizarPedido() {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const pagamento = document.getElementById("pagamento").value;
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  let mensagem = `Pedido:%0A`;
  let totalGeral = 0;

  carrinho.forEach(p => {

    const preco = Number(p.preco);
    const quantidade = Number(p.quantidade);
    const subtotal = preco * quantidade;

    totalGeral += subtotal;

    mensagem += `- ${p.nome}%0A`;
    mensagem += `  ${quantidade}x R$ ${preco.toFixed(2)}%0A`;
    mensagem += `  Valor do iten: R$ ${subtotal.toFixed(2)}%0A%0A`;
  });

  mensagem += `Total do Pedido: R$ ${totalGeral.toFixed(2)}%0A%0A`;

  mensagem += `Cliente: ${nome}%0A`;
  mensagem += `Endereço: ${endereco}%0A`;
  mensagem += `Pagamento: ${pagamento}`;

  const numero = "5551995310123";
  const url = `https://wa.me/${numero}?text=${mensagem}`;

  window.open(url, "_blank");
}