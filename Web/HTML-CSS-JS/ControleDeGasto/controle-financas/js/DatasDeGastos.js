// js/DatasDeGastos.js
import { auth } from "./firebase.js"; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// =========================================
// MONITOR DE LOGIN (SISTEMA DE SEGURANÇA)
// =========================================
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Se o usuário não estiver logado, expulsa para a tela de login
    window.location.href = "login.html";
  }
});

// =========================================
// SINCRO-TEMA: GERENCIADOR DE INTERFACE
// =========================================
window.mudarTema = (tema) => {
  // Altera o atributo no HTML disparando a troca de variáveis do CSS
  document.documentElement.setAttribute("data-theme", tema);
  // Guarda a informação para as próximas vezes que abrir o site
  localStorage.setItem("sistema-tema", tema);
};

// Faz o select iniciar apontado para o tema correto que está ativo no navegador
const temaAtual = localStorage.getItem("sistema-tema") || "pink";
const seletorDom = document.getElementById("theme-selector");
if (seletorDom) {
  seletorDom.value = temaAtual;
}

// =========================================
// FUNÇÃO PARA DESLOGAR DO SISTEMA
// =========================================
window.sairDaConta = () => {
  // Ativa o loading na tela enquanto desloga
  const loading = document.getElementById("loading-overlay");
  if (loading) loading.classList.remove("hidden");
  
  signOut(auth).catch((error) => {
    if (loading) loading.classList.add("hidden");
    console.error("Erro ao desconectar:", error);
    alert("Erro ao tentar romper conexão.");
  });
};