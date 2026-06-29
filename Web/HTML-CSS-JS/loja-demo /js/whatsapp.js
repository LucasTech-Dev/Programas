// ============================================================
// whatsapp.js — finalização via WhatsApp
// ============================================================

function finalizarPedido() {
  const nome      = document.getElementById("nome").value.trim();
  const endereco  = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;
  const carrinho  = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (!nome || !endereco) {
    alert("Preencha nome e endereço antes de finalizar.");
    return;
  }

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let msg = `🛒 *Novo Pedido*%0A%0A`;
  let total = 0;

  carrinho.forEach(p => {
    const preco    = Number(p.preco);
    const qtd      = Number(p.quantidade);
    const subtotal = preco * qtd;
    total += subtotal;

    msg += `▸ *${p.nome}*%0A`;
    msg += `  ${qtd}x R$ ${preco.toFixed(2)} = R$ ${subtotal.toFixed(2)}%0A`;
    if (p.observacao) {
      msg += `  📝 Obs: ${p.observacao}%0A`;
    }
    msg += `%0A`;
  });

  msg += `💰 *Total: R$ ${total.toFixed(2)}*%0A%0A`;
  msg += `👤 *Cliente:* ${nome}%0A`;
  msg += `📍 *Endereço:* ${endereco}%0A`;
  msg += `💳 *Pagamento:* ${pagamento}`;

  const numero = "5551995310123"; // ← troque pelo número real
  window.open(`https://wa.me/${numero}?text=${msg}`, "_blank");
}
