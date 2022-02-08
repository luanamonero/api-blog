
# Projeto API de Blogs! :bookmark_tabs:

Nesse projeto, o objetivo era desenvolver um back-end usando `ORM` com o pacote `sequelize` do `npm`, e ser capaz de:
 - Criar e associar tabelas usando `models` do `sequelize`
 - Construir endpoints para consumir os models que criar 
 - Fazer um `CRUD` com o `ORM`


Essa API, possui alguns endpoints (seguindo os princípios do REST) que estão conectados ao banco de dados, sempre pensando no modelo de negócio. A ideia dessa API é criar uma tabela para os usuários que desejam se cadastar. Após o cadastro vamos ao endpoint de login com algumas validaçoẽs, caso esteja tudo certo a requisição retorna um token que será usado para futuras rotas. Além da tebela de usuários, temos a de categorias, blogpost e a tabela intermediária que conecta o as categorias e os post, seguindo o principio da 3º forma normal.


# Ferramentas usadas 🧰

 🔨 Estè projeto foi feito com Node.js utilizando o pacote sequelize.
 
---

### INSTRUÇÕES :

1. Clone o repositório
  * `git clone git@github.com:luanamonero/api-blog.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd api-blog`

2. Instale as dependências
  * `npm install`
 
3. Crie, na raíz do projeto, um arquivo `.env` contendo as seguintes variáveis:
```
  HOSTNAME=seu-host-mysql
  MYSQL_USER=seu-usuario-mysql
  MYSQL_PASSWORD=sua-senha-mysql
  JWT_SECRET=qualquer-string-aleatoria
  PORT=porta-para-iniciar-aplicação(padrão = 3000)
```

**Você irá precisar configurar as variáveis globais do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

**Faça essas configurações também para as variáveis de ambiente usadas nesses arquivo:**

`api-blog/config/config.js`

```
module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
};
```

**(Neste arquivo é obrigatório deixar o nome do database como `"database": 'blogs_api'`)**


#### Variável JWT (opcional):

`JWT_SECRET`

**Também poderá ser utilizada esta variável de ambiente para o SECRET do JWT**

4. Inicie o projeto
  * `npm start `
  * `npm run debug` caso queria rodar o projeto através do nodemon
  * 
5. Acesse as rotas através de softwares como Postman e Insomnia através do endereço:
  * `http://localhost:3000`
---

## Rotas:

### Endpoint POST `/user`

- O corpo da requisição deve ter o seguinte formato:

```json
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```

- `displayName` deve ser uma string com pelo menos 8 caracteres;

- `email` deve ser uma string no formato `email@email.com` e único;

- `password` deve ser uma string com 6 caracteres;

- `image` deve ser uma string;

- Caso haja falha na validação a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "\"displayName\" is required"
}
```

- Caso o email já esteja em uso a requisição será respondida com o `status 409` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "User already registered"
}
```

- Caso haja sucesso na validação a requisição será respondida com o `status 201` com o token de autenticação:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
}
```

### Endpoint POST `/login`

- O corpo da requisição deve ter o seguinte formato:

```json
{
  "email": "email@mail.com",
  "password": "123456"
}
```

- Caso haja falha na validação a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "\"email\" is required"
}
```

- Caso haja falha no login a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Invalid fields"
}
```

- Caso haja sucesso na validação a requisição será respondida com o `status 200` com o token de autenticação:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
}
```

### Endpoint GET `/user`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
[
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
]
```

### Endpoint GET `/user/:id`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o usuário não exista a requisição será respondida com o `status 404` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "User does not exist"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
{
  "id": "401465483996",
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```

### Endpoint POST `/categories`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- O corpo da requisição deve ter o seguinte formato:

```json
 {
   "name": "Inovação"
 }
```

- Caso haja falha na validação a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "\"name\" is required"
}
```

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o token seja válido a requisição será respondida com o `status 201` com o seguinte corpo:

```json
 {
   "id": 3,
   "name": "Inovação"
 }
```

### Endpoint GET `/categories`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
[
  {
    "id": 1,
    "name": "Escola"
  },
  {
    "id": 2,
    "name": "Inovação"
  }
]
```

### Endpoint POST `/post`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- O corpo da requisição deve ter o seguinte formato:

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```

- `categoryIds` deve ser um array contendo os ids de categorias cadastradas;

- Caso haja falha na validação a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "\"title\" is required"
}
```

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso alguma das categorias seja inválida a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "\"categoryIds\" not found"
}
```

- Caso o token seja válido a requisição será respondida com o `status 201` com o seguinte corpo:

```json
{
  "id": 4,
  "userId": 1,
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```

### Endpoint GET `/post`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
]
```

### Endpoint GET `/post/:id`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o post não exista a requisição será respondida com o `status 404` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Post does not exist"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
{
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    }
  ]
}
```
### FEEDBACKS
---
Caso queira dar alguma sugestão entre em contato comigo via linkedin: www.linkedin.com/in/luanamonero

Ficarei feliz em receber!
