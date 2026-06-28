// Firebase do projeto loja-demo.
// Substitua os valores abaixo pelas credenciais do projeto Firebase correspondente.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

export const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY",
  authDomain: "loja-demo.firebaseapp.com",
  projectId: "loja-demo",
  storageBucket: "loja-demo.appspot.com",
  messagingSenderId: "COLE_SEU_SENDER_ID",
  appId: "COLE_SEU_APP_ID",
};

export const app = initializeApp(firebaseConfig);
export const lojaPadraoId = "mercado-centro";
export const tipoProjeto = "loja";
