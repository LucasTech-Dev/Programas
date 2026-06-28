export function normalizarUsuario(uid, dados = {}) {
  return {
    uid,
    email: dados.email || "",
    tipo: dados.tipo || "cliente",
    lojaId: dados.lojaId || "",
    status: dados.status || "inativo",
  };
}
