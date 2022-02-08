const express = require('express');
const bodyParser = require('body-parser');

const routesUser = require('./src/router/user');
const routesLogin = require('./src/router/login');
const routesCategories = require('./src/router/categories');
const routesPost = require('./src/router/post');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routesUser);
app.use('/login', routesLogin);
app.use('/categories', routesCategories);
app.use('/post', routesPost);

app.listen(3000, () => console.log('ouvindo porta 3000!'));