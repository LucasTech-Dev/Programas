import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "../firebase/firestore.js";
import { lojaPadraoId } from "../firebase/config.js";
import { normalizarProduto } from "../models/Produto.js";

const produtosRef = (lojaId = lojaPadraoId) => collection(db, "lojas", lojaId, "produtos");
const produtoRef = (id, lojaId = lojaPadraoId) => doc(db, "lojas", lojaId, "produtos", String(id));

export class ProdutoService {
  static observar(callback, lojaId = lojaPadraoId) {
    const q = query(produtosRef(lojaId), where("ativo", "==", true), orderBy("ordem", "asc"));
    return onSnapshot(q, snap => callback(snap.docs.map(d => normalizarProduto(d.id, d.data()))));
  }
  static async listar(lojaId = lojaPadraoId, somenteAtivos = true) {
    const base = somenteAtivos ? query(produtosRef(lojaId), where("ativo", "==", true), orderBy("ordem", "asc")) : query(produtosRef(lojaId), orderBy("ordem", "asc"));
    const snap = await getDocs(base);
    return snap.docs.map(d => normalizarProduto(d.id, d.data()));
  }
  static async buscar(id, lojaId = lojaPadraoId) {
    const snap = await getDoc(produtoRef(id, lojaId));
    return snap.exists() ? normalizarProduto(snap.id, snap.data()) : null;
  }
  static async buscarPorCategoria(categoria, lojaId = lojaPadraoId) {
    const snap = await getDocs(query(produtosRef(lojaId), where("categoria", "==", categoria), where("ativo", "==", true)));
    return snap.docs.map(d => normalizarProduto(d.id, d.data()));
  }
  static async buscarPorNome(nome, lojaId = lojaPadraoId) {
    const termo = nome.toLowerCase();
    return (await this.listar(lojaId)).filter(p => p.nome.toLowerCase().includes(termo));
  }
  static async criar(produto, lojaId = lojaPadraoId) {
    return addDoc(produtosRef(lojaId), { ...produto, ativo: produto.ativo !== false, criadoEm: serverTimestamp(), atualizadoEm: serverTimestamp() });
  }
  static async editar(id, produto, lojaId = lojaPadraoId) {
    return updateDoc(produtoRef(id, lojaId), { ...produto, atualizadoEm: serverTimestamp() });
  }
  static async excluir(id, lojaId = lojaPadraoId) {
    return deleteDoc(produtoRef(id, lojaId));
  }
  static async alterarImagem(id, imagem, lojaId = lojaPadraoId) {
    return this.editar(id, { imagem, imagens: imagem ? [imagem] : [] }, lojaId);
  }
  static async importarLista(produtos, lojaId = lojaPadraoId) {
    return Promise.all(produtos.map((produto, ordem) => setDoc(produtoRef(produto.id || crypto.randomUUID(), lojaId), { ...produto, ordem, atualizadoEm: serverTimestamp() }, { merge: true })));
  }
}
