// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
// IMPORTANTE: Esta linha abaixo precisa existir para o banco funcionar
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXC22u8xtOtEdrZpsY7Acj570PGuzArCI",
  authDomain: "bancoprojetosgerais.firebaseapp.com",
  projectId: "bancoprojetosgerais",
  storageBucket: "bancoprojetosgerais.firebasestorage.app",
  messagingSenderId: "130638145549",
  appId: "1:130638145549:web:3add929eaddbea05794d44"
};

const app = initializeApp(firebaseConfig);

// IMPORTANTE: Você precisa exportar o db e o auth para que os outros arquivos possam usá-los!
export const db = getFirestore(app);
export const auth = getAuth(app);