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
    apiKey: "AIzaSyCkoEAPyZ98mBrYwrMh8Mv_CEJO9p-Rxp4",
    authDomain: "auladozecurubu.firebaseapp.com",
    projectId: "auladozecurubu",
    storageBucket: "auladozecurubu.firebasestorage.app",
    messagingSenderId: "942634370568",
    appId: "1:942634370568:web:e9c1ba9999513fc5e433bd"
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

        // Cria usuário no Authentication
        const credencial = await createUserWithEmailAndPassword(
            auth,
            email,
            senha
        );

        const uid = credencial.user.uid;

        // Salva no Firestore
        await setDoc(doc(db, "usuarios", uid), {
            uid: uid,
            nome: nome,
            email: email,
            criadoEm: serverTimestamp()
        });

        alert("Usuário salvo com sucesso!");

        form.reset();

    } catch (erro) {

        console.error(erro);

        alert("Erro: " + erro.message);

    }

});