# Auditoria profissional do GitHub

**Última revisão:** 2026-08-17  
**Repositório:** `LucasTech-Dev/Programas`  
**Objetivo:** preparar o repositório para avaliação técnica e reduzir riscos de exposição acidental.

## 1. Resumo executivo

O repositório apresenta variedade técnica real e é adequado para servir como portfólio de formação. O maior ganho imediato está em melhorar a primeira impressão: documentação, hierarquia de projetos, nomenclatura e transparência sobre o que é projeto principal versus exercício.

Também foram identificados riscos de segurança que precisam continuar sendo tratados como prioridade, especialmente histórico de credenciais, dados de entrada/saída e regras de serviços externos.

## 2. Pontos fortes

- Diversidade de projetos em Python, Web, Kotlin/Android e C.
- Uso prático de APIs, automação, tratamento de dados, Firebase e Supabase.
- O projeto de ISBN demonstra um fluxo próximo de ETL: entrada, transformação, consultas externas, enriquecimento e persistência.
- O código Android apresenta separação entre activities, model, repository, firebase e utils.
- O `.gitignore` já cobre ambientes virtuais, dependências, logs e arquivos `.env`.

## 3. Problemas de apresentação encontrados

### Alta prioridade

- README principal anteriormente apresentava placeholders como links de portfólio/currículo e pouca orientação para o avaliador.
- Projetos importantes não possuem documentação uniforme.
- Há nomes de diretórios com erros ou padrão inconsistente, como `AplicacaoAndoid` e `TratamendoPDF`.
- Existem projetos parecidos que podem parecer duplicados.

### Média prioridade

- Alguns projetos de estudo competem visualmente com projetos mais relevantes.
- Arquivos gerados e relatórios podem aumentar ruído na raiz e dentro dos projetos.
- Faltam screenshots/demonstrações nos projetos que mais deveriam ser apresentados.

## 4. Segurança

### Crítica — histórico de credencial

Uma auditoria anterior identificou uma senha em texto claro em `Python/Automacoes/AUTO_github.PY`. O arquivo atual utiliza variáveis de ambiente (`GITHUB_EMAIL`, `GITHUB_PASSWORD` e `GITHUB_USERNAME`), o que é uma melhoria.

**Importante:** remover a senha do arquivo atual não remove a exposição caso ela tenha existido em commits antigos. A credencial deve ser considerada comprometida e revogada/trocada se ainda estiver válida.

### Alta — Firebase / Firestore

Arquivos de configuração de aplicações web podem conter identificadores e `apiKey`. Em aplicações Firebase para navegador, esses valores podem fazer parte da configuração pública do cliente; isso não substitui regras de autenticação e autorização.

As regras de Firestore/Storage devem ser revisadas individualmente para impedir leitura ou escrita não autorizada.

### Alta — dados de entrada e saída

O projeto de ISBN possui arquivos de entrada/conversa e arquivos de saída gerados. Eles devem ser classificados antes de permanecerem públicos:

- remover dados pessoais ou conversas reais;
- anonimizar exemplos;
- manter apenas amostras necessárias para demonstrar o projeto;
- ignorar exports gerados quando eles não fizerem parte do produto.

### Média — automação de login

`AUTO_github.PY` automatiza login usando Selenium e credenciais fornecidas por ambiente. Isso reduz o risco de hardcoding, mas ainda é uma arquitetura frágil para automação de conta. Sempre que possível, prefira mecanismos oficiais de autenticação/API e tokens com escopo mínimo.

## 5. Alterações realizadas nesta etapa

- README principal redesenhado para apresentação profissional.
- Projetos principais organizados em uma tabela de destaque.
- Tecnologias não comprovadas neste repositório deixaram de ser apresentadas como experiência confirmada.
- Links de GitHub e LinkedIn foram atualizados.
- Nova política `SECURITY.md` substituiu o template genérico do GitHub.
- Arquivo temporário `slavando.txt` foi removido da branch de melhoria.
- O trabalho está sendo realizado na branch `chore/github-portfolio-security` para evitar misturar a revisão com a linha principal.

## 6. O que ainda precisa ser feito

1. Revisar projetos web individualmente.
2. Revisar arquivos de configuração Firebase/Supabase.
3. Classificar/remover logs, exports e dados de teste desnecessários.
4. Adicionar README aos projetos relevantes que ainda não possuem documentação suficiente.
5. Corrigir nomes de diretórios com autorização e planejamento de links.
6. Adicionar screenshots reais aos projetos de destaque.
7. Adicionar automação de análise de segurança/dependências quando houver manifests compatíveis.
8. Revisar o histórico Git caso exista suspeita de credenciais anteriormente publicadas.

## 7. Limitações desta auditoria

A análise desta etapa foi feita sobre a estrutura e os arquivos acessíveis pela integração do GitHub. O mecanismo de busca de código do repositório não estava disponível para uma varredura textual completa de todos os arquivos.

Portanto, esta revisão **não deve ser interpretada como garantia de ausência de vulnerabilidades**. A próxima etapa deve fazer uma inspeção direcionada dos projetos web, Firebase, Supabase e arquivos de dados.

## 8. Critério de qualidade para o portfólio

Um avaliador deve conseguir responder rapidamente:

- Quem desenvolveu este repositório?
- Quais são os projetos mais relevantes?
- Quais tecnologias foram realmente utilizadas?
- Como executar cada projeto?
- Como os dados são tratados?
- Que cuidados de segurança foram adotados?
- Onde estão os resultados/demonstrações?

A nova estrutura do README foi criada para responder às primeiras perguntas imediatamente e direcionar o avaliador aos projetos mais fortes.
