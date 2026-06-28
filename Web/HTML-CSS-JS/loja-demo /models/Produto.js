export function normalizarProduto(id, dados = {}) {
  return {
    id: dados.id || id,
    nome: dados.nome || "",
    descricao: dados.descricao || "",
    categoria: dados.categoria || "",
    preco: Number(dados.preco || 0),
    precoPromocional: dados.precoPromocional ? Number(dados.precoPromocional) : null,
    imagem: dados.imagem || "",
    imagens: dados.imagens || (dados.imagem ? [dados.imagem] : []),
    codigo: dados.codigo || "",
    ativo: dados.ativo !== false,
    destaque: Boolean(dados.destaque),
    novo: Boolean(dados.novo),
    promocao: Boolean(dados.promocao),
    ordem: Number(dados.ordem || 0),
    criadoEm: dados.criadoEm || null,
    atualizadoEm: dados.atualizadoEm || null,
  };
}
