import { deleteObject, getDownloadURL, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { storage } from "../firebase/storage.js";
import { lojaPadraoId } from "../firebase/config.js";

export class UploadService {
  static async uploadProduto(arquivo, lojaId = lojaPadraoId) {
    const caminho = `produtos/${lojaId}/${Date.now()}-${arquivo.name}`;
    const arquivoRef = ref(storage, caminho);
    await uploadBytes(arquivoRef, arquivo);
    return getDownloadURL(arquivoRef);
  }
  static async removerImagem(caminhoOuUrl) {
    return deleteObject(ref(storage, caminhoOuUrl));
  }
}
