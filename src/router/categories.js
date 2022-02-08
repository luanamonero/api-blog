const express = require('express');
const middlewaresAuth = require('../middlewares/validateJWT');
const middlewaresCategory = require('../middlewares/validateCategory');
const categoryController = require('../controllers/categories');

const routesCategories = express.Router();

routesCategories.post('/',
middlewaresAuth.auth,
middlewaresCategory.validateName,
categoryController.create);

routesCategories.get('/', 
middlewaresAuth.auth, 
categoryController.getAll);

module.exports = routesCategories;