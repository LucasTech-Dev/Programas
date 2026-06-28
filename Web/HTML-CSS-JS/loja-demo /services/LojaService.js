import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "../firebase/firestore.js";
import { lojaPadraoId } from "../firebase/config.js";
import { normalizarLoja } from "../models/Loja.js";

export class LojaService {
  static async buscarLoja(lojaId = lojaPadraoId) {
    const snap = await getDoc(doc(db, "lojas", lojaId));
    return snap.exists() ? normalizarLoja(snap.id, snap.data()) : null;
  }
  static async buscarTipo(lojaId = lojaPadraoId) {
    return (await this.buscarLoja(lojaId))?.tipo || null;
  }
  static async buscarWhatsapp(lojaId = lojaPadraoId) {
    return (await this.buscarLoja(lojaId))?.whatsapp || "";
  }
}
