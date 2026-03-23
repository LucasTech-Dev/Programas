function finalizarPedido() {

  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // VERIFICAÇÃO DOS CAMPOS
  if (!nome || !endereco || !pagamento) {
    alert("Preencha todos os campos antes de finalizar o pedido.");
    return;
  }

  // VERIFICA SE O CARRINHO ESTÁ VAZIO
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  } 

  let mensagem = `Pedido:%0A`;
  let totalGeral = 0;

  carrinho.forEach(p => {

    const preco = Number(p.preco);
    const quantidade = Number(p.quantidade);
    const subtotal = preco * quantidade;

    totalGeral += subtotal;

    mensagem += `- ${p.nome}%0A`;
    mensagem += `  ${quantidade}x R$ ${preco.toFixed(2)}%0A`;
    mensagem += `  Valor do Item: R$ ${subtotal.toFixed(2)}%0A%0A`;
  });

  mensagem += `Total do Pedido: R$ ${totalGeral.toFixed(2)}%0A%0A`;

  mensagem += `Cliente: ${nome}%0A`;
  mensagem += `Endereço: ${endereco}%0A`;
  mensagem += `Pagamento: ${pagamento}`;

  const numero = "5551995310123";
  const url = `https://wa.me/${numero}?text=${mensagem}`;

  window.open(url, "_blank");
}