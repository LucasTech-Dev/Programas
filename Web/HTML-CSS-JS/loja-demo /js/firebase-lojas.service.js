// ============================================================
// firebase-lojas.service.js — conexão e seed do bancoLojas
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDc9R9fy7X-6hwK1kvGHEkXw9tU7ztT5TE",
  authDomain: "bancolojas-9be21.firebaseapp.com",
  projectId: "bancolojas-9be21",
  storageBucket: "bancolojas-9be21.firebasestorage.app",
  messagingSenderId: "272077064125",
  appId: "1:272077064125:web:2d3cec181b6acad8a3f4d4"
};

export const appLojas = initializeApp(firebaseConfig, "bancoLojas");
export const dbLojas = getFirestore(appLojas);

export const LOJA_DEMO_ID = "lojademo";

const lojaDemo = {
  id: LOJA_DEMO_ID,
  nome: "Loja Demo",
  descricao: "Loja de demonstração criada automaticamente para validar a integração com o bancoLojas.",
  ativa: true,
  tipo: "loja",
  criadaEm: serverTimestamp(),
  atualizadaEm: serverTimestamp()
};

const produtosDemo = [
  {
    id: 1,
    nome: "Cartão de visita demo",
    categoria: "Impressos",
    preco: 49.9,
    imagem: "img/cartaoVisita.webp",
    ativo: true,
    ordem: 1
  },
  {
    id: 2,
    nome: "Banner demo",
    categoria: "Comunicação visual",
    preco: 89.9,
    imagem: "img/Banner.jpg",
    ativo: true,
    ordem: 2
  }
];

export async function garantirLojaDemo() {
  const lojaRef = doc(dbLojas, "lojas", LOJA_DEMO_ID);
  const lojaSnap = await getDoc(lojaRef);

  if (!lojaSnap.exists()) {
    await setDoc(lojaRef, lojaDemo);
  } else {
    await setDoc(lojaRef, { atualizadaEm: serverTimestamp() }, { merge: true });
  }

  await Promise.all(produtosDemo.map((produto) =>
    setDoc(doc(dbLojas, "lojas", LOJA_DEMO_ID, "produtos", String(produto.id)), {
      ...produto,
      lojaId: LOJA_DEMO_ID,
      atualizadoEm: serverTimestamp()
    }, { merge: true })
  ));
}

export async function listarProdutosLojaDemo() {
  const produtosRef = collection(dbLojas, "lojas", LOJA_DEMO_ID, "produtos");
  const snapshot = await getDocs(query(produtosRef, orderBy("ordem", "asc")));
  return snapshot.docs.map((produtoDoc) => ({ idDocumento: produtoDoc.id, ...produtoDoc.data() }));
}
<<<<<<< ours


async function carregarJsonLocal(nomeArquivo) {
  const resposta = await fetch(`data/${nomeArquivo}.json?t=${Date.now()}`);
  if (!resposta.ok) throw new Error(`Não foi possível carregar data/${nomeArquivo}.json`);
  return resposta.json();
}

async function gravarColecaoLocal(nomeColecao, registros) {
  if (Array.isArray(registros)) {
    await Promise.all(registros.map((registro, indice) => {
      const idDocumento = String(registro.id || registro.codigo || indice + 1);
      return setDoc(doc(dbLojas, "lojas", LOJA_DEMO_ID, nomeColecao, idDocumento), {
        ...registro,
        lojaId: LOJA_DEMO_ID,
        atualizadoEm: serverTimestamp()
      }, { merge: true });
    }));
    return registros.length;
  }

  await setDoc(doc(dbLojas, "lojas", LOJA_DEMO_ID, nomeColecao, "principal"), {
    ...registros,
    lojaId: LOJA_DEMO_ID,
    atualizadoEm: serverTimestamp()
  }, { merge: true });
  return 1;
}

export async function criarTabelasLojaDemo() {
  await garantirLojaDemo();

  const arquivos = ["categorias", "banners", "empresa", "tema", "seo", "config"];
  const [produtos, ...demaisDados] = await Promise.all([
    carregarJsonLocal("produtos"),
    ...arquivos.map(carregarJsonLocal)
  ]);

  const totalProdutos = await gravarColecaoLocal("produtos", produtos);
  const totais = { ["produtos"]: totalProdutos };

  for (let i = 0; i < arquivos.length; i += 1) {
    totais[arquivos[i]] = await gravarColecaoLocal(arquivos[i], demaisDados[i]);
  }

  await setDoc(doc(dbLojas, "setups", LOJA_DEMO_ID), {
    banco: "bancoLojas",
    entidade: LOJA_DEMO_ID,
    colecoesCriadas: Object.keys(totais),
    totais,
    atualizadoEm: serverTimestamp()
  }, { merge: true });

  return totais;
}
=======
>>>>>>> theirs
