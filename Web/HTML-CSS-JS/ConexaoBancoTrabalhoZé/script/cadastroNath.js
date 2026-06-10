import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCyR3CBT9897L_f8ppe8jen1pO1dFKDcAA",
    authDomain: "bancodanath.firebaseapp.com",
    projectId: "bancodanath",
    storageBucket: "bancodanath.firebasestorage.app",
    messagingSenderId: "564690861205",
    appId: "1:564690861205:web:90d1513df31acb788e6f9c",
    measurementId: "G-56E1CRE5KV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {

        const credencial = await createUserWithEmailAndPassword(
            auth,
            email,
            senha
        );

        const uid = credencial.user.uid;

        await setDoc(doc(db, "usuarios", uid), {
            uid,
            nome,
            email,
            criadoEm: serverTimestamp()
        });

        alert("Usuário salvo com sucesso!");

        form.reset();

    } catch (erro) {

        console.error(erro);

        alert("Erro: " + erro.message);

    }

});