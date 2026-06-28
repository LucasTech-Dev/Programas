# Varredura de uso — Restaurante Demo

## Removido/corrigido nesta limpeza

- Resolvidos marcadores de conflito (`<<<<<<<`, `=======`, `>>>>>>>`) em HTML, JavaScript e JSON.
- `admin/produtos.html` ficou apenas como redirecionamento para `admin/index.html`, evitando manter dois painéis administrativos diferentes.
- `data/produtos.json` voltou a ser JSON válido para o Live Server e para o fallback do restaurante.

## Arquivos principais em uso

- `index.html`, `busc.html` e `carrinho.html` são as telas públicas.
- `js/loja.js`, `js/pesquisa.js`, `js/carrinho.js`, `js/modal.js` e `js/whatsapp.js` são carregados pelas telas públicas.
- `services/DataStore.js` é usado pelo painel administrativo local em `admin/index.html`.
- `js/firebase-restaurante.service.js` é usado pelo restaurante e por `criar-tabelas.html` para criar/atualizar coleções no Firestore.

## Candidatos a remover depois de confirmar

- `firebase/` e os services Firebase antigos (`AuthService.js`, `UploadService.js`, `UsuarioService.js`, `LojaService.js`, `ProdutoService.js`) não são carregados pelo painel novo baseado em `DataStore.js`, mas foram mantidos porque podem ser reaproveitados em uma próxima versão com login/upload.
- `style/materialdesignicons.min.css` e `style/fonts/` estão no projeto, porém as páginas atuais também usam CDN do Material Design Icons. Pode remover o pacote local se decidir depender somente do CDN.
