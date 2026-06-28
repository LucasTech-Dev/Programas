(function () {
  const ROOT = window.APP_ROOT || '';
  const PREFIX = window.APP_STORAGE_PREFIX || 'lojaDemo';
  const FILES = ['produtos','categorias','empresa','banners','tema','seo','config'];
  const draftKey = file => `${PREFIX}:draft:${file}`;
  const changesKey = `${PREFIX}:changes`;

  async function readJson(file) {
    const draft = localStorage.getItem(draftKey(file));
    if (draft) return JSON.parse(draft);
    const res = await fetch(`${ROOT}data/${file}.json?t=${Date.now()}`);
    if (!res.ok) throw new Error(`Não foi possível carregar ${file}.json`);
    return res.json();
  }

  async function writeJson(file, data, type = 'EDITADO') {
    localStorage.setItem(draftKey(file), JSON.stringify(data, null, 2));
    registerChange(file, type);
    return data;
  }

  function registerChange(file, type) {
    const changes = getChanges().filter(c => !(c.arquivo === `${file}.json` && c.status === 'PENDENTE'));
    changes.push({ arquivo: `${file}.json`, tipo: type, horario: new Date().toLocaleString('pt-BR'), status: 'PENDENTE' });
    localStorage.setItem(changesKey, JSON.stringify(changes));
  }

  function getChanges() { return JSON.parse(localStorage.getItem(changesKey) || '[]'); }
  function clearDrafts() { FILES.forEach(f => localStorage.removeItem(draftKey(f))); localStorage.removeItem(changesKey); }

  function validateUrl(value) {
    if (!value) return true;
    return /^(https?:\/\/|mailto:|tel:|img\/|\.\/|\.\.\/)/.test(value);
  }

  const DataStore = { FILES, readJson, writeJson, getChanges, clearDrafts, draftKey, changesKey };

  const ProdutoService = {
    async listar(opts = {}) { const list = await readJson('produtos'); return opts.todos ? list : list.filter(p => p.ativo !== false).sort((a,b)=>(a.ordem||0)-(b.ordem||0)); },
    async salvar(produto) { const list = await readJson('produtos'); const id = produto.id || Math.max(0, ...list.map(p => Number(p.id)||0)) + 1; const normalized = { ativo:true, destaque:false, novo:false, promocao:false, ordem:list.length+1, ...produto, id }; normalized.galeria = normalized.galeria || normalized.imagens || (normalized.imagem ? [normalized.imagem] : []); normalized.imagens = normalized.galeria; normalized.imagem = normalized.imagem || normalized.galeria[0] || ''; const idx = list.findIndex(p => String(p.id) === String(id)); if (idx >= 0) list[idx] = { ...list[idx], ...normalized }; else list.push(normalized); return writeJson('produtos', list, idx >= 0 ? 'EDITADO' : 'CRIADO'); },
    async duplicar(id) { const list = await readJson('produtos'); const base = list.find(p => String(p.id) === String(id)); if (!base) throw new Error('Produto não encontrado'); const novo = { ...base, id: undefined, nome: `${base.nome} (cópia)`, codigo: `${base.codigo || 'ITEM'}-COPY`, ordem: list.length + 1 }; return this.salvar(novo); },
    async arquivar(id) { const list = await readJson('produtos'); const item = list.find(p => String(p.id) === String(id)); if (item) item.ativo = false; return writeJson('produtos', list, 'ARQUIVADO'); },
    async excluir(id) { const list = (await readJson('produtos')).filter(p => String(p.id) !== String(id)); return writeJson('produtos', list, 'REMOVIDO'); },
    validar(list, categorias=[]) { const errors=[]; const catNames = categorias.filter(c=>c.ativa!==false).map(c=>c.nome); list.forEach((p,i)=>{ const ref=`Produto ${i+1}${p.nome?` (${p.nome})`:''}`; if(!p.nome) errors.push(`${ref}: sem nome`); if(!p.imagem && !(p.galeria||p.imagens||[]).length) errors.push(`${ref}: sem imagem`); if(Number(p.preco)<0) errors.push(`${ref}: preço negativo`); if(p.categoria && catNames.length && !catNames.includes(p.categoria)) errors.push(`${ref}: categoria inválida`); }); return errors; }
  };

  function crudService(file, idField='id') { return { async listar(){ return readJson(file); }, async salvar(item){ const list=await readJson(file); const id=item[idField] || Math.max(0,...list.map(x=>Number(x[idField])||0))+1; const idx=list.findIndex(x=>String(x[idField])===String(id)); const val={...item,[idField]:id}; if(idx>=0) list[idx]=val; else list.push(val); return writeJson(file,list,idx>=0?'EDITADO':'CRIADO'); }, async excluir(id){ const list=(await readJson(file)).filter(x=>String(x[idField])!==String(id)); return writeJson(file,list,'REMOVIDO'); } }; }

  const CategoriaService = crudService('categorias');
  const BannerService = crudService('banners');
  const EmpresaService = { obter:()=>readJson('empresa'), salvar:data=>writeJson('empresa', data, 'EDITADO') };
  const TemaService = { obter:()=>readJson('tema'), salvar:data=>writeJson('tema', data, 'EDITADO') };
  const SeoService = { obter:()=>readJson('seo'), salvar:data=>writeJson('seo', data, 'EDITADO') };
  const ConfigService = { obter:()=>readJson('config'), salvar:data=>writeJson('config', data, 'EDITADO') };
  const PublicacaoService = { async pacote(){ const data={}; for (const f of FILES) data[`${f}.json`] = await readJson(f); return { geradoEm:new Date().toISOString(), alteracoes:getChanges(), arquivos:data }; }, async validar(){ const [produtos,categorias,banners,empresa]=await Promise.all([readJson('produtos'),readJson('categorias'),readJson('banners'),readJson('empresa')]); const errors=[...ProdutoService.validar(produtos,categorias)]; categorias.forEach((c,i)=>{ if(!c.nome) errors.push(`Categoria ${i+1}: sem nome`); }); banners.forEach((b,i)=>{ if(b.ativo!==false && !b.imagem) errors.push(`Banner ${i+1}: sem imagem`); if(b.link && !validateUrl(b.link)) errors.push(`Banner ${i+1}: link inválido`); }); if(!empresa.nome) errors.push('Empresa: nome obrigatório'); if(empresa.googleMaps && !validateUrl(empresa.googleMaps)) errors.push('Empresa: Google Maps inválido'); return errors; }, limparPublicados: clearDrafts };

  Object.assign(window, { DataStore, ProdutoService, CategoriaService, EmpresaService, BannerService, TemaService, SeoService, ConfigService, PublicacaoService });
})();
