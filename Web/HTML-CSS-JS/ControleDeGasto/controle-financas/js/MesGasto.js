// js/MesGasto.js
import { auth } from "./firebase.js"; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Array auxiliar para converter o número do mês em nome legível
const NOMES_MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Captura os parâmetros passados na URL (?ano=2026&mes=6)
const parametros = new URLSearchParams(window.location.search);
const anoSelecionado = parametros.get("ano");
const mesSelecionado = parametros.get("mes"); // Vem como string numérica (ex: "6")

// =========================================
// MONITOR DE LOGIN E INICIALIZAÇÃO
// =========================================
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Se os parâmetros não existirem na URL, volta para o histórico seguro
  if (!anoSelecionado || !mesSelecionado) {
    window.location.href = "DatasDeGastos.html";
    return;
  }

  // Configura o título da página baseado nos parâmetros recebidos
  configurarTituloPagina();

  // Executa a busca dos dados no Firebase passando o mês e ano corretos
  carregarDadosDoMes(user.uid, anoSelecionado, mesSelecionado);
});

// =========================================
// CONFIGURAÇÃO DO TÍTULO DINÂMICO
// =========================================
function configurarTituloPagina() {
  const elementoTitulo = document.getElementById("mes-titulo");
  if (elementoTitulo) {
    const indiceMes = parseInt(mesSelecionado, 10) - 1; // Ajusta para base zero do array
    const nomeMes = NOMES_MESES[indiceMes] || `Mês ${mesSelecionado}`;
    elementoTitulo.innerText = `${nomeMes} / ${anoSelecionado}`;
  }
}

// =========================================
// BUSCA DE DADOS HISTÓRICOS (PLACEHOLDER)
// =========================================
function carregarDadosDoMes(uid, ano, mes) {
  const carregando = document.getElementById("loading-overlay");
  
  try {
    // -------------------------------------------------------------------------
    // ESPAÇO PARA O SEU BANCO DE DADOS:
    // Aqui você deve fazer o fetch/get dos dados salvos no nó ou coleção do 
    // Firebase correspondente a: `usuarios/${uid}/historico/${ano}_${mes}`
    // -------------------------------------------------------------------------
    
    console.log(`Buscando dados do usuário ${uid} referentes a ${mes}/${ano}`);

    // Exemplo de como desativar o carregamento assim que seus dados chegarem:
    if (carregando) carregando.classList.add("hidden");

  } catch (erro) {
    console.error("Erro ao carregar histórico:", erro);
    if (carregando) carregando.classList.add("hidden");
    alert("Falha ao recuperar registros deste período.");
  }
}

// =========================================
// SINCRO-TEMA: GERENCIADOR DE INTERFACE
// =========================================
window.mudarTema = (tema) => {
  document.documentElement.setAttribute("data-theme", tema);
  localStorage.setItem("sistema-tema", tema);
};

const temaAtual = localStorage.getItem("sistema-tema") || "pink";
const seletorDom = document.getElementById("theme-selector");
if (seletorDom) {
  seletorDom.value = temaAtual;
}

// =========================================
// FUNÇÃO PARA DESLOGAR DO SISTEMA
// =========================================
window.sairDaConta = () => {
  const loading = document.getElementById("loading-overlay");
  if (loading) loading.classList.remove("hidden");
  
  signOut(auth).catch((error) => {
    if (loading) loading.classList.add("hidden");
    console.error("Erro ao desconectar:", error);
    alert("Erro ao tentar romper conexão.");
  });
};