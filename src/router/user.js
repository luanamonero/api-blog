const express = require('express');
const middlewaresUser = require('../middlewares/validateUser');
const middlewaresAuth = require('../middlewares/validateJWT');
const userController = require('../controllers/user');
 
const userRoutes = express.Router();

userRoutes.post('/', 
middlewaresUser.validateName, 
middlewaresUser.validatePassword, 
middlewaresUser.validateEmail, 
userController.create);

userRoutes.get('/', 
middlewaresAuth.auth, 
userController.getAll);

userRoutes.get('/:id', 
middlewaresAuth.auth, 
userController.getById);

module.exports = userRoutes;