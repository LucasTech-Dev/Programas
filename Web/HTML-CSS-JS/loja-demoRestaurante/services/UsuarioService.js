import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "../firebase/firestore.js";
import { normalizarUsuario } from "../models/Usuario.js";

export class UsuarioService {
  static async buscarUsuario(uid) {
    const snap = await getDoc(doc(db, "usuarios", uid));
    return snap.exists() ? normalizarUsuario(uid, snap.data()) : null;
  }
  static async buscarLojaUsuario(uid) { return (await this.buscarUsuario(uid))?.lojaId || null; }
  static async buscarPermissao(uid) { return (await this.buscarUsuario(uid))?.tipo || null; }
}
