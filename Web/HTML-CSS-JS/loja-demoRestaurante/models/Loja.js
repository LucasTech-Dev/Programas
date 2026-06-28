export function normalizarLoja(id, dados = {}) {
  return {
    id,
    nome: dados.nome || "",
    tipo: dados.tipo || "loja",
    status: dados.status || "ativo",
    plano: dados.plano || "",
    email: dados.email || "",
    telefone: dados.telefone || "",
    whatsapp: dados.whatsapp || "",
    criadoEm: dados.criadoEm || null,
    ultimaAtualizacao: dados.ultimaAtualizacao || null,
  };
}
