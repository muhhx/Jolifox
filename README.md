## Possiveis problemas

- Retornar entidade com ID errado ao criar Campaign
- Possivel problema = existe text com 2 items - retorna em apenas 1 - update e se torna 1 item apeans tbm

# Testes

## CampaignFindRepository

- Buscar Campaign com todos os dados
- Buscar Campaign com dados parciais
- Buscar Campaign com nenhum dado
- Buscar Campaign com erro no schema
- Buscar Campaign não existente (retorna null)

# Comments

### Controller

Camada de controller responsável por validar se request body é valido e contém os tipos corretos. Não validar regras de negócio se contem numero x de caracteres, isso é responsabilidade da camada de domínio.

# Regras de negócio

Como o código tem uma dependencia muito grande com o schema já existente no banco de dados do Notion, muitas regras de negócio precisam apenas seguir o schema e limitações do Notion. Porém, além disso foram acrescentadas algumas outras...

Futuramente, separar em regras que o schema do banco, regras novas e regras que nao necessariamente seguem.

## Gerais

1. Para criar um Campaign, precisa de ao menos um campo. (obs: na hora de buscar do banco nao quebra o constructor pois sempre terá pelo menos os seguintes campos: ID, pageId e createdTime) (Regra Minha)
2. Ao criar um Campaign, gera um emoji e imagem de capa automático! (Regra minha)
3. Toto rich_text e title tem limite de 2000 caracteres

## Ideias de Regra

- Campos precisam ser validos (strings, etc.)
- Company, Campaign, Where, com limite de caracter 255
- Language com limite de 50 caracteres
- Description, content e imageContent sem limite (apenas os 2000 do Notion)

/\*\*

- - Possiveis regras de negocio adicionais:
-      - Rating
-      - Calculos em cima dos dados apresentados
-      - Resumo AI
  \*/

## PlannedDate

2. Para criar um PlannedDate, precisa de no mínimo a data de start. (Regra do Notion)
3. Caso queira adicionar um período de data no PlannedDate, basta adicionar TAMBÉM um end date. Regra: o end date precisa ser maior ou igual ao start date. (Regra do Notion)
4. Time zones não foi implementado! Limitar para UTC.

## Images

5. NotionAPI não tem implementado upload de arquivos, entao vou aceitar apenas URL na criação pelo meu sistema. (Regra minha)
6. URL fornecida precisa ter <= 2000 caracteres. (Regra do Notion)
7. Máximo de 100 imagens ao criar um Campaign (Regra do Notion) // Posso fazer menos (porem problema se tiver +100 no banco anterior a isso)
8. Imagem quebrada = apenas nao vai renderizar no Notion. (deixar passar por agora.)

## Language

9. Precisa escolher uma cor válida (Regra do Notion)
10. Posso limitar os caras de apeans selecionar selects especificos e nao criar! porem bagunca o banco entao NAO! (Regra Minha)
