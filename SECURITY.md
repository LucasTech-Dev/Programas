# Política de Segurança

## Objetivo

Este repositório é público e reúne projetos de estudo e portfólio. A prioridade desta política é evitar a exposição de credenciais, dados pessoais e configurações sensíveis.

## O que não deve ser publicado

- Senhas e tokens de acesso.
- Chaves privadas ou arquivos de credenciais.
- Arquivos `.env` contendo valores reais.
- Dados pessoais desnecessários.
- Logs que contenham informações sensíveis.
- Exports de bancos de dados ou conversas reais sem anonimização.

## Segredos e variáveis de ambiente

Credenciais devem ser fornecidas por variáveis de ambiente ou pelo mecanismo seguro de secrets da plataforma utilizada.

Arquivos de exemplo devem conter apenas placeholders, por exemplo:

```text
API_KEY=your_api_key_here
SUPABASE_URL=https://example.supabase.co
```

Nunca substitua placeholders por credenciais reais antes de fazer commit.

## Firebase e serviços públicos

Configurações web do Firebase podem conter identificadores destinados ao cliente. Isso **não transforma regras do Firebase/Firestore em públicas ou seguras automaticamente**.

As regras de autenticação, Firestore, Storage e demais serviços devem ser configuradas para permitir somente as operações necessárias.

## Caso uma credencial seja exposta

1. Revogue ou altere a credencial imediatamente.
2. Verifique os logs de acesso do serviço afetado.
3. Remova a credencial do código atual.
4. Se necessário, trate também o histórico Git como comprometido.
5. Gere uma nova credencial com o menor privilégio necessário.

Remover um segredo apenas do arquivo atual não garante que ele desapareceu do histórico do Git.

## Como reportar um problema

Para uma vulnerabilidade real envolvendo este repositório, abra uma comunicação privada pelo perfil do proprietário no GitHub antes de publicar detalhes exploráveis em uma Issue pública.

Ao relatar, informe:

- projeto ou caminho afetado;
- descrição do problema;
- impacto esperado;
- passos gerais para reprodução, evitando incluir credenciais reais;
- evidências necessárias para confirmar o problema.

## Escopo desta política

Esta política cobre o repositório `LucasTech-Dev/Programas` e seus projetos públicos. Ela não garante que dependências de terceiros estejam livres de vulnerabilidades; dependências devem ser avaliadas individualmente.
