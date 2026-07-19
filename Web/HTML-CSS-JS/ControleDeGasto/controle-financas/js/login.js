import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Monitora se o usuário já está logado. Se sim, joga ele direto pro painel.
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

// Função acionada ao clicar em "INICIAR SESSÃO"
window.executarLogin = async () => {
  const email = document.getElementById("login-email").value;
  const passe = document.getElementById("login-password").value;

  if (!email || !passe) return alert("Por favor, insira todas as credenciais no terminal.");

  try {
    await signInWithEmailAndPassword(auth, email, passe);
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    alert("Erro na autenticação: " + error.message);
  }
};

// Função acionada ao clicar em "REGISTRAR NOVA CREDENCIAL"
window.executarCadastro = async () => {
  const email = document.getElementById("login-email").value;
  const passe = document.getElementById("login-password").value;

  if (!email || !passe) return alert("Defina um e-mail e uma senha válidos para o registro!");

  try {
    await createUserWithEmailAndPassword(auth, email, passe);
    alert("Credencial criada com sucesso! Redirecionando para a rede central...");
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    alert("Falha ao registrar conta: " + error.message);
  }
};