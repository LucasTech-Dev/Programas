// js/index.js
import GastoService from "./service/GastoService.js";
import { auth } from "./firebase.js"; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const dataAtual = new Date();
const ANO = dataAtual.getFullYear(); 
const MES = dataAtual.getMonth() + 1; 

let rendaTotal = 0;
let contas = [];
let usuarioUid = null; 

// =========================================
// SISTEMA DE MODAIS CUSTOMIZADOS
// =========================================
let resolveConfirmacao = null;

function mostrarAlerta(mensagem) {
  document.getElementById("modal-alert-msg").innerText = mensagem;
  document.getElementById("modal-alert").classList.remove("hidden");
}

window.fecharAlerta = () => {
  document.getElementById("modal-alert").classList.add("hidden");
};

function mostrarConfirmacao(mensagem) {
  return new Promise((resolve) => {
    document.getElementById("modal-confirm-msg").innerText = mensagem;
    document.getElementById("modal-confirm").classList.remove("hidden");
    // Guarda a função que vai resolver (responder) a promise
    resolveConfirmacao = resolve;
  });
}

window.respostaConfirmacao = (resposta) => {
  document.getElementById("modal-confirm").classList.add("hidden");
  if (resolveConfirmacao) {
    resolveConfirmacao(resposta); // Retorna true ou false para quem chamou o modal
    resolveConfirmacao = null;
  }
};

// =========================================
// MONITOR DE LOGIN (SISTEMA DE SEGURANÇA)
// =========================================
onAuthStateChanged(auth, (user) => {
  if (user) {
    usuarioUid = user.uid; 
    carregarDados();       
  } else {
    window.location.href = "login.html";
  }
});

// =========================================
// FUNÇÕES DE CARREGAMENTO E RENDERIZAÇÃO
// =========================================
async function carregarDados() {
  if (!usuarioUid) return;

  try {
    const mesDados = await GastoService.inicializarMesSeNaoExistir(usuarioUid, ANO, MES);
    rendaTotal = mesDados.rendaTotal || 0;
    document.getElementById("renda-display").innerText = `R$ ${rendaTotal.toFixed(2)}`;

    contas = await GastoService.listarContas(usuarioUid, ANO, MES);
    renderizarTela();
  } catch (error) {
    console.error("Erro na busca dos dados:", error);
  } finally {
    document.getElementById("loading-overlay").classList.add("hidden");
  }
}

function renderizarTela() {
  const container = document.getElementById("lista-contas");
  container.innerHTML = "";
  
  let totalGastos = 0;

  contas.forEach(conta => {
    totalGastos += conta.valor;
    
    const card = document.createElement("div");
    card.className = `card ${conta.status === 'pago' ? 'pago' : ''}`;
    
    card.innerHTML = `
      <div class="card-title">${conta.nome} ${conta.tipo === 'fixo' ? '📌' : ''}</div>
      <div>R$ ${conta.valor.toFixed(2)}</div>
      <div class="card-actions">
        ${conta.status === 'pendente' 
          ? `<button class="btn-pagar" onclick="marcarPago('${conta.id}')">Pagar</button>`
          : `<button class="btn-voltar" onclick="desfazerPagamento('${conta.id}')">Voltar</button>`
        }
        <button class="btn-voltar btn-logout-cyber" onclick="removerConta('${conta.id}')">Remover</button>
      </div>
    `;
    container.appendChild(card);
  });

  const saldo = rendaTotal - totalGastos;
  document.getElementById("gastos-display").innerText = `R$ ${totalGastos.toFixed(2)}`;
  
  const saldoRef = document.getElementById("saldo-display");
  saldoRef.innerText = `R$ ${saldo.toFixed(2)}`;
  saldoRef.style.color = saldo >= 0 ? "var(--success)" : "var(--warning)";
}

// =========================================
// AÇÕES DO USUÁRIO (BOTÕES DA TELA)
// =========================================
window.adicionarNovaConta = async () => {
  let nome = document.getElementById("nome-conta").value;
  const valorInput = document.getElementById("valor-conta").value;
  const tipoSelecionado = document.getElementById("tipo-conta").value;

  if(!nome || !valorInput) {
    mostrarAlerta("Preencha todos os campos!");
    return;
  }
  if(!usuarioUid) {
    mostrarAlerta("Erro: Usuário não identificado.");
    return;
  }

  let tipoParaOBanco = "fixo";
  let valorFinal = Number(valorInput);

  if (tipoSelecionado === "unico") {
    tipoParaOBanco = "variavel";
  } else {
    const meses = Number(tipoSelecionado);
    if (meses > 1) {
      valorFinal = valorFinal / meses;
      nome = `${nome} (Guarda 1/${meses} de R$ ${valorInput})`;
    }
  }

  await GastoService.adicionarConta(usuarioUid, ANO, MES, { 
    nome: nome, 
    valor: valorFinal, 
    tipo: tipoParaOBanco 
  });
  
  document.getElementById("nome-conta").value = "";
  document.getElementById("valor-conta").value = "";
  
  carregarDados();
};

window.atualizarRenda = async () => {
  const novaRenda = document.getElementById("input-renda").value;
  if(!novaRenda || !usuarioUid) return;
  
  await GastoService.atualizarRenda(usuarioUid, ANO, MES, novaRenda);
  document.getElementById("input-renda").value = "";
  carregarDados();
};

window.marcarPago = async (id) => {
  if(!usuarioUid) return;
  await GastoService.alterarStatusConta(usuarioUid, ANO, MES, id, "pago");
  carregarDados();
};

window.desfazerPagamento = async (id) => {
  if(!usuarioUid) return;
  await GastoService.alterarStatusConta(usuarioUid, ANO, MES, id, "pendente");
  carregarDados();
};

window.removerConta = async (id) => {
  if(!usuarioUid) return;
  
  // Usando o nosso próprio modal com "await"
  const confirmar = await mostrarConfirmacao("Deseja realmente apagar esta conta? Ela não voltará nos próximos meses.");
  
  if (!confirmar) return; // Se clicou em cancelar, para aqui.

  await GastoService.removerConta(usuarioUid, ANO, MES, id);
  carregarDados();
};

// =========================================
// FUNÇÃO PARA DESLOGAR DO SISTEMA
// =========================================
window.sairDaConta = () => {
  document.getElementById("loading-overlay").classList.remove("hidden");
  signOut(auth).catch((error) => {
    document.getElementById("loading-overlay").classList.add("hidden");
    console.error("Erro ao desconectar:", error);
    mostrarAlerta("Erro ao tentar romper conexão.");
  });
};

// =========================================
// SINCRO-TEMA: GERENCIADOR DE INTERFACE
// =========================================
window.mudarTema = (tema) => {
  document.documentElement.setAttribute("data-theme", tema);
  localStorage.setItem("sistema-tema", tema);
};

const temaAtual = localStorage.getItem("sistema-tema") || "pink";
const seletorDom = document.getElementById("theme-selector");
if(seletorDom) {
  seletorDom.value = temaAtual;
}