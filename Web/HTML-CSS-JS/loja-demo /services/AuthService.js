import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "../firebase/auth.js";
import { UsuarioService } from "./UsuarioService.js";

export class AuthService {
  static login(email, senha) { return signInWithEmailAndPassword(auth, email, senha); }
  static logout() { return signOut(auth); }
  static usuarioAtual() { return auth.currentUser; }
  static recuperarSenha(email) { return sendPasswordResetEmail(auth, email); }
  static verificarSessao(callback) { return onAuthStateChanged(auth, callback); }
  static async usuarioAutorizado() {
    const user = auth.currentUser;
    if (!user) return null;
    const perfil = await UsuarioService.buscarUsuario(user.uid);
    return perfil?.status === "ativo" ? perfil : null;
  }
}
