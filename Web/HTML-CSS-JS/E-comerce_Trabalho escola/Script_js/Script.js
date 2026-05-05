// ============================================================
// BLOCO 1 — FILTRO DE PESQUISA DE PRODUTOS
// ============================================================
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.querySelector('.busca input[type="search"]');
  const cards = Array.from(document.querySelectorAll('.cards'));
  const resultadoDiv = document.querySelector('.resultado-pesquisa');
  const conteudoPrincipal = document.querySelectorAll(
    '.prop1, .prop2, .prop3, .mercados, .mercados02, #h1conteiner, .conteiner'
  );

  // Guardar preço numérico de cada card
  cards.forEach(card => {
    const precoTexto = card.querySelector('h2').innerText;
    const match = precoTexto.match(/(\d+[\.,]?\d*)/);
    const preco = match ? parseFloat(match[1].replace(',', '.')) : 0;
    card.dataset.price = preco;
  });

  function filtrarEExibir() {
    const termo = searchInput.value.toLowerCase().trim();

    if (termo === '') {
      resultadoDiv.style.display = 'none';
      conteudoPrincipal.forEach(el => el.style.display = '');
      return;
    }

    const filtrados = cards.filter(card =>
      card.innerText.toLowerCase().includes(termo)
    );

    filtrados.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));

    conteudoPrincipal.forEach(el => el.style.display = 'none');

    resultadoDiv.style.display = 'flex';
    resultadoDiv.innerHTML = '';
    filtrados.forEach(card => resultadoDiv.appendChild(card.cloneNode(true)));
  }

  searchInput.addEventListener('input', filtrarEExibir);
});


// ============================================================
// BLOCO 2 — MENU DE LOGIN (com classes)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const btnEntrar = document.getElementById("btn-entrar");
  const menuEntrar = document.querySelector(".menu-entrar");

  btnEntrar.addEventListener("click", (e) => {
    e.stopPropagation();
    menuEntrar.classList.toggle("ativo");
  });

  document.addEventListener("click", (e) => {
    if (!menuEntrar.contains(e.target) && !btnEntrar.contains(e.target)) {
      menuEntrar.classList.remove("ativo");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") menuEntrar.classList.remove("ativo");
  });
});


// ============================================================
// BLOCO 3 — MENU DE LOGIN (com IDs)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const btnEntrar = document.getElementById("btnEntrar");
  const menuEntrar = document.getElementById("menuEntrar");

  btnEntrar.addEventListener("click", (e) => {
    e.stopPropagation();
    menuEntrar.classList.toggle("ativo");
  });

  document.addEventListener("click", (e) => {
    if (!menuEntrar.contains(e.target) && !btnEntrar.contains(e.target)) {
      menuEntrar.classList.remove("ativo");
    }
  });
});







