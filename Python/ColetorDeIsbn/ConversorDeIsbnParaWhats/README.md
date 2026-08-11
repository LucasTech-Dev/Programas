# Conversor e enriquecedor de ISBN

Pipeline em Python para extrair ISBNs de um arquivo de entrada, consultar APIs públicas de livros, enriquecer dados bibliográficos, gerar arquivos de apoio e salvar registros no Supabase.

## Sobre o projeto

O projeto automatiza parte do tratamento de uma lista de livros. A entrada principal é um arquivo de texto, processado por classes de parsing e enriquecimento. O resultado pode ser enviado para o Supabase e também exportado em arquivos de saída.

## Funcionalidades confirmadas

- Leitura de arquivo de entrada em `entrada/conversa.txt`.
- Extração e tratamento de ISBNs.
- Consulta a APIs de livros, incluindo Open Library, Google Books, Brasil API e Mercado Editorial.
- Enriquecimento de dados como título, autores, editora, páginas, idioma, descrição, categorias e capa quando disponíveis.
- Registro de livros não encontrados com dados mínimos locais.
- Exportação de JSON para itens não enriquecidos.
- Salvamento em lote no Supabase.
- Reprocessamento de registros a partir de JSON de saída.

## Tecnologias

- Python
- Requests
- Pandas
- OpenPyXL
- python-dotenv
- Supabase

## Arquitetura real

```text
Arquivo de entrada
        ↓
Parser / limpeza
        ↓
Pipeline de enriquecimento
        ↓
Consultas a APIs externas
        ↓
Modelos de dados
        ↓
Repository Supabase + exportadores locais
```

## Estrutura do projeto

```text
ConversorDeIsbnParaWhats/
├── entrada/                  # arquivo de entrada local
├── saida/                    # arquivos gerados pelo processamento
├── src/
│   ├── apis/                 # clientes das APIs externas
│   ├── database/             # configuração do Supabase
│   ├── models/               # modelos usados no pipeline
│   ├── repositories/         # persistência de livros
│   ├── services/             # enriquecimento e reprocessamento
│   ├── main.py               # ponto de entrada
│   ├── parser.py             # extração dos dados
│   └── limpeza.py            # limpeza/tratamento auxiliar
├── requirements.txt
├── .env.example
└── README.md
```

## Instalação

```bash
git clone https://github.com/LucasTech-Dev/Programas.git
cd Programas/Python/ColetorDeIsbn/ConversorDeIsbnParaWhats
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

No Windows, a ativação do ambiente virtual pode ser feita com:

```bash
.venv\\Scripts\\activate
```

## Configuração

Crie um arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Variáveis necessárias:

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

Nunca publique `.env`, chaves, tokens ou senhas reais.

## Execução

A partir da pasta do projeto:

```bash
cd src
python main.py
```

O comportamento atual do `main.py` executa o reprocessamento do arquivo `saida/nao_enriquecidos.json`. Para executar o pipeline principal, revise a função chamada em `main()` antes da execução.

## Screenshots

[ADICIONAR SCREENSHOTS]

## Roadmap

- [ ] Adicionar testes automatizados para parser e enriquecimento.
- [ ] Documentar formato esperado do arquivo de entrada.
- [ ] Revisar se os arquivos de `saida/` devem continuar versionados.
- [ ] Adicionar exemplos sem dados sensíveis.

## Autor

Lucas Sant'Ana Dias
