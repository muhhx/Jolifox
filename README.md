## Jolifox Web Application Notion

### Como rodar

Voce precisa ter `yarn` e `node` instalados na sua máquina local.

1. Primeiro, clone o repositório em sua máquina.
2. Entre no root do diretório e rode o seguinte comando para instalar as dependências locais:

```
yarn
```

3. Feito isso, crie um arquivo .env e adicione as variáveis de ambientes especificadas no .env.example:

```
NOTION_API_KEY=
NOTION_DATABASE_ID=
```

Pronto! Para rodar o ambiente localmente, use o comando:

```
yarn dev
```

Para rodar o test suite:

```
yarn test
```

ou (para acompanhar o coverage):

```
yarn test:coverage
```
