## Jolifox Web Application Notion

1. Como rodar o projeto localmente.
2. Explicar desenvolvimento do projeto e tals.

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
HTTP_PORT=
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

## Endpoints

> Base URL = http://localhost:PORT/api/v1

### Get specific Campaign

Returns a specific Campaign based on its Notion unique ID.

| ENDPOINT              | METHOD | Params | URL Params | Success Response                                                | Error Response                                                                      |
| :-------------------- | :----- | :----- | :--------- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| /campaign/:campaignId | GET    | -      | campaignId | **Code:** 200 - OK</br></br> **Content:** [Campaign](#campaign) | 400 - BAD REQUEST </br></br> 404 - NOT FOUND </br></br> 500 - INTERNAL SERVER ERROR |

### Create Campaign

Creates a new Campaign entity into the Notion database.

| ENDPOINT  | METHOD | Params                          | URL Params | Success Response        | Error Response                                                                             |
| :-------- | :----- | :------------------------------ | :--------- | :---------------------- | :----------------------------------------------------------------------------------------- |
| /campaign | POST   | **Body:** [Campaign](#campaign) | -          | **Code:** 201 - CREATED | 400 - BAD REQUEST </br></br> 422 - VALIDATION ERROR </br></br> 500 - INTERNAL SERVER ERROR |

### Update specific Campaign

Updates a specific Campaign based on its Notion unique ID.

| ENDPOINT              | METHOD | Params                          | URL Params | Success Response                                                | Error Response                                                                                                        |
| :-------------------- | :----- | :------------------------------ | :--------- | :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| /campaign/:campaignId | PUT    | **Body:** [Campaign](#campaign) | campaignId | **Code:** 200 - OK</br></br> **Content:** [Campaign](#campaign) | 400 - BAD REQUEST </br></br> 404 - NOT FOUND </br></br> 422 - VALIDATION ERROR </br></br> 500 - INTERNAL SERVER ERROR |

### Delete specific Campaign

Deletes a specific Campaign based on its Notion unique ID from the Notion database.

| ENDPOINT              | METHOD | Params | URL Params | Success Response           | Error Response                                                                      |
| :-------------------- | :----- | :----- | :--------- | :------------------------- | :---------------------------------------------------------------------------------- |
| /campaign/:campaignId | DELETE | -      | campaignId | **Code:** 204 - NO CONTENT | 400 - BAD REQUEST </br></br> 404 - NOT FOUND </br></br> 500 - INTERNAL SERVER ERROR |

## Entities

#### Campaign

- **id:** Notion unique_id field.
- **pageId:** Notion page ID, displayed in the URL.
- **description:** Notion database description field.
- **imageContent:** Notion database imageContent field.
- **company:** Notion database company field.
- **content:** Notion database content field.
- **language:** Notion database language select field with color and name tag.
- **icon:** Notion page icon.
- **where:** Notion database where field.
- **plannedDate:** Notion database date field with required start and optional end for data range.
- **cover:** Notion page cover.
- **images:** Notion images field containing an array of image URLs.
- **campaign:** Notion database campaign field.
- **createdTime:** Notion database createdTime metadata to when the page was created.

```
{
  "id": {
    "type": "number",
    "required": false
  },
  "pageId": {
    "type": "string",
    "required": false
  },
  "description": {
    "type": "string",
    "required": false
  },
  "imageContent": {
    "type": "string",
    "required": false
  },
  "company": {
    "type": "string",
    "required": false
  },
  "content": {
    "type": "string",
    "required": false
  },
  "language": {
    "type": {
        "color": {
            "type": "string",
            "required": true
        },
        "name": {
            "type": "string",
            "required": true
        },
    },
    "required": false
  },
  "icon": {
    "type": "string",
    "required": false
  },
  "where": {
    "type": "string",
    "required": false
  },
  "plannedDate": {
    "type": {
        "start": {
            "type": "Date",
            "required": true
        },
        "end": {
            "type": "Date",
            "required": false
        },
    },
    "required": false
  },
  "cover": {
    "type": "string",
    "required": false
  },
  "images": {
    "type": [{
        "name": {
            "type": "string",
            "required": true
        },
        "url": {
            "type": "string",
            "required": true
        },
    }],
    "required": false
  },
  "campaign": {
    "type": "string",
    "required": false
  },
  "createdTime": {
    "type": "Date",
    "required": false
  },
}
```
