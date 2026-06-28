// ============================================================
// firebase-restaurante.service.js — conexão e seed do bancoRestaurante
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
  apiKey: "AIzaSyCzxWpGAYDGDMuEjxh4aTLyuwsQSuZ7BkE",
  authDomain: "bancorestaurante.firebaseapp.com",
  projectId: "bancorestaurante",
  storageBucket: "bancorestaurante.firebasestorage.app",
  messagingSenderId: "18310261177",
  appId: "1:18310261177:web:f6483c7961f3ea4a422e68"
};

export const appRestaurante = initializeApp(firebaseConfig, "bancoRestaurante");
export const dbRestaurante = getFirestore(appRestaurante);

export const RESTAURANTE_DEMO_ID = "restaurantedemo";

const restauranteDemo = {
  id: RESTAURANTE_DEMO_ID,
  nome: "Restaurante Demo",
  descricao: "Restaurante de demonstração criado automaticamente para validar a integração com o bancoRestaurante.",
  ativo: true,
  tipo: "restaurante",
  criadoEm: serverTimestamp(),
  atualizadoEm: serverTimestamp()
};

const itensCardapioDemo = [
  {
    id: 1,
    nome: "Prato executivo demo",
    categoria: "Pratos",
    preco: 29.9,
    imagem: "img/cartaoVisita.webp",
    ativo: true,
    ordem: 1
  },
  {
    id: 2,
    nome: "Suco natural demo",
    categoria: "Bebidas",
    preco: 9.9,
    imagem: "img/Panfleto.webp",
    ativo: true,
    ordem: 2
  }
];

export async function garantirRestauranteDemo() {
  const restauranteRef = doc(dbRestaurante, "restaurantes", RESTAURANTE_DEMO_ID);
  const restauranteSnap = await getDoc(restauranteRef);

  if (!restauranteSnap.exists()) {
    await setDoc(restauranteRef, restauranteDemo);
  } else {
    await setDoc(restauranteRef, { atualizadoEm: serverTimestamp() }, { merge: true });
  }

  await Promise.all(itensCardapioDemo.map((item) =>
    setDoc(doc(dbRestaurante, "restaurantes", RESTAURANTE_DEMO_ID, "cardapio", String(item.id)), {
      ...item,
      restauranteId: RESTAURANTE_DEMO_ID,
      atualizadoEm: serverTimestamp()
    }, { merge: true })
  ));
}

export async function listarCardapioRestauranteDemo() {
  const cardapioRef = collection(dbRestaurante, "restaurantes", RESTAURANTE_DEMO_ID, "cardapio");
  const snapshot = await getDocs(query(cardapioRef, orderBy("ordem", "asc")));
  return snapshot.docs.map((itemDoc) => ({ idDocumento: itemDoc.id, ...itemDoc.data() }));
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
      return setDoc(doc(dbRestaurante, "restaurantes", RESTAURANTE_DEMO_ID, nomeColecao, idDocumento), {
        ...registro,
        restauranteId: RESTAURANTE_DEMO_ID,
        atualizadoEm: serverTimestamp()
      }, { merge: true });
    }));
    return registros.length;
  }

  await setDoc(doc(dbRestaurante, "restaurantes", RESTAURANTE_DEMO_ID, nomeColecao, "principal"), {
    ...registros,
    restauranteId: RESTAURANTE_DEMO_ID,
    atualizadoEm: serverTimestamp()
  }, { merge: true });
  return 1;
}

export async function criarTabelasRestauranteDemo() {
  await garantirRestauranteDemo();

  const arquivos = ["categorias", "banners", "empresa", "tema", "seo", "config"];
  const [produtos, ...demaisDados] = await Promise.all([
    carregarJsonLocal("produtos"),
    ...arquivos.map(carregarJsonLocal)
  ]);

  const totalProdutos = await gravarColecaoLocal("cardapio", produtos);
  const totais = { ["cardapio"]: totalProdutos };

  for (let i = 0; i < arquivos.length; i += 1) {
    totais[arquivos[i]] = await gravarColecaoLocal(arquivos[i], demaisDados[i]);
  }

  await setDoc(doc(dbRestaurante, "setups", RESTAURANTE_DEMO_ID), {
    banco: "bancoRestaurante",
    entidade: RESTAURANTE_DEMO_ID,
    colecoesCriadas: Object.keys(totais),
    totais,
    atualizadoEm: serverTimestamp()
  }, { merge: true });

  return totais;
}
=======
>>>>>>> theirs
