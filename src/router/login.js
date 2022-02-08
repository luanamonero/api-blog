const express = require('express');
const middlewaresLogin = require('../middlewares/validateLogin');
const longinController = require('../controllers/login');
 
const loginRoutes = express.Router();

loginRoutes.post('/', 
middlewaresLogin.validatePassword, 
middlewaresLogin.validateEmail, 
longinController.login);

module.exports = loginRoutes;