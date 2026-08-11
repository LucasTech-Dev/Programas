# Auditoria profissional do GitHub

Data da auditoria: 2026-08-11

## Escopo analisado

- Perfil público `LucasTech-Dev` no GitHub.
- Repositório local `Programas`.
- Estrutura de pastas, READMEs, `.gitignore`, arquivos de configuração e indícios de tecnologias no código.
- Busca por padrões comuns de segredos: `.env`, tokens, senhas, API keys, Firebase, Supabase e bancos locais.

## A. Pontos fortes

- Há variedade real de projetos e estudos com Python, HTML, CSS, JavaScript, Kotlin/Android, Firebase e Supabase.
- O projeto de ISBN tem fluxo técnico relevante para back-end/dados: leitura de entrada, parsing, consulta a APIs, enriquecimento, exportação e persistência.
- Existem projetos web com separação parcial entre `models`, `services`, `firebase`, `js`, `style`, `admin` e `data`.
- O perfil público do GitHub já tem descrição pessoal, localização e link de LinkedIn cadastrado.

## B. Problemas encontrados

- O README principal era curto, mas citava projetos genéricos e tecnologias sem vincular claramente a evidências do código.
- Alguns projetos importantes têm README ausente, vazio ou com instruções incompletas.
- Há nomes de pastas pouco profissionais ou com erro de digitação, como `AplicacaoAndoid`, `TratamendoPDF`, `E-comerce_Trabalho escola` e `loja-demo ` com espaço no final.
- Existem projetos duplicados ou parecidos de e-commerce/cardápio, o que dificulta a navegação.
- Há arquivos gerados ou locais versionados, como planilhas, relatórios de saída e logs.
- Não há evidência local de Node.js/Express/React neste repositório; essas tecnologias devem ficar como `[A CONFIRMAR]` até aparecerem em projetos públicos.

## C. Projetos que devem ser destacados

1. `Python/ColetorDeIsbn/ConversorDeIsbnParaWhats` — demonstra Python, APIs, ETL simples, Supabase e organização por camadas.
2. `Web/HTML-CSS-JS/loja-demoRestaurante` — demonstra aplicação web com catálogo, carrinho, painel admin e integração com Firebase/GitHub API.
3. `Web/HTML-CSS-JS/ControleDeGasto/controle-financas` — demonstra aplicação web com Firebase e organização de telas/scripts.
4. `AplicacaoAndoid` — demonstra Kotlin, Android e Firebase Authentication.

## D. Projetos que devem ser arquivados ou deixados como estudo

> Recomendação apenas; nada foi deletado ou arquivado automaticamente.

- `C/C` — exercícios de linguagem C podem permanecer como estudo, mas não devem ser destaque para vagas Node.js/Full Stack.
- `Web/HTML-CSS-JS/Lista de tarefas` — projeto simples; útil como estudo, mas não como destaque principal.
- `Web/HTML-CSS-JS/E-comerce_Trabalho escola` — nome pouco profissional e provável trabalho escolar; recomendar arquivar ou renomear após revisão.
- `Web/HTML-CSS-JS/ConexaoBancoTrabalhoZé` — nome pouco profissional e possivelmente específico de trabalho; recomendar arquivar ou renomear após revisão.
- `Web/HTML-CSS-JS/e-comercedemo` e `Web/HTML-CSS-JS/loja-demo ` — parecem versões similares ao projeto de loja; avaliar duplicidade antes de destacar.

## E. Projetos que precisam de melhorias

- `Python/ColetorDeIsbn/ConversorDeIsbnParaWhats`: README profissional, `.env.example`, revisão de arquivos de saída versionados e instruções de execução.
- `Python/Automacoes/TratamendoPDF`: README vazio e presença de `app/log.txt` versionado.
- `Web/HTML-CSS-JS/loja-demoRestaurante`: README bom, mas com trechos comerciais que podem parecer promessa de venda; revisar para portfólio técnico.
- `Web/HTML-CSS-JS/ControleDeGasto/controle-financas`: melhorar documentação, setup Firebase e screenshots.
- `AplicacaoAndoid`: corrigir nome do diretório/repositório somente com autorização, pois pode quebrar links.

## F. Tecnologias que realmente aparecem no código

- Python, Requests, Pandas, OpenPyXL, Selenium, Flask.
- HTML5, CSS3, JavaScript.
- Firebase/Firestore, Supabase.
- Kotlin, Android, Gradle.
- C.

## G. Tecnologias declaradas mas não confirmadas neste repositório

- Node.js — não foi encontrado `package.json` ou back-end Node.js local.
- Express — não foi encontrado projeto Express local.
- React — não foi encontrado projeto React local.
- MySQL e SQL Server — não foram encontrados arquivos/schema/scripts que confirmem uso neste repositório.

## H. Arquivos potencialmente sensíveis

- `Python/Automacoes/AUTO_github.PY` continha e-mail e senha em texto claro. A senha foi removida e substituída por variável de ambiente.
- Arquivos com `firebaseConfig` e `apiKey` aparecem em projetos web. Chaves web do Firebase podem ser públicas em alguns cenários, mas devem ser revisadas junto às regras do Firebase/Firestore.
- `Python/ColetorDeIsbn/ConversorDeIsbnParaWhats/entrada/conversa.txt` pode conter dados reais de conversas; revisar antes de manter público.
- `Python/ColetorDeIsbn/ConversorDeIsbnParaWhats/saida/*` contém saídas geradas; revisar se há dados pessoais ou dados que não devem ficar versionados.

## I. Problemas de segurança

- **CRÍTICA:** senha em texto claro em script de automação. Corrigido no arquivo, mas a credencial deve ser trocada/revogada se já foi enviada ao GitHub.
- **ALTA:** revisar regras do Firebase/Firestore e Storage nos projetos web para garantir que as chaves públicas não permitam escrita/leitura indevida.
- **ALTA:** não salvar tokens do GitHub sem orientar o usuário sobre escopo mínimo e riscos do `localStorage`.
- **MÉDIA:** remover logs, planilhas e saídas geradas do controle de versão quando não forem necessárias como amostra.

## J. Melhorias prioritárias

- **CRÍTICA:** trocar/revogar a senha exposta anteriormente e evitar credenciais hardcoded.
- **ALTA:** criar documentação profissional para os projetos principais.
- **ALTA:** adicionar `.env.example` onde há variáveis obrigatórias.
- **MÉDIA:** padronizar nomes de projetos antes de divulgá-los no currículo/portfólio.
- **MÉDIA:** adicionar screenshots reais dos projetos relevantes.
- **BAIXA:** reduzir decoração visual excessiva e manter READMEs objetivos.

## Recomendações sobre commits e branches

- Não reescrever histórico sem autorização.
- Usar Conventional Commits para novas alterações, por exemplo `docs: atualiza perfil e auditoria`.
- Revisar branches antigas antes de excluir; nenhuma branch foi removida.
