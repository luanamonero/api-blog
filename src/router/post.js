const express = require('express');
const postContoller = require('../controllers/post');
const middlewaresAuth = require('../middlewares/validateJWT');
const middlewaresPostBlog = require('../middlewares/validatePost');
 
const postRoutes = express.Router();

postRoutes.post('/',
middlewaresAuth.auth,
middlewaresPostBlog.validateEmpty,
postContoller.createBlog);

postRoutes.get('/', 
middlewaresAuth.auth, 
postContoller.getAll);

postRoutes.get('/:id', 
middlewaresAuth.auth, 
postContoller.getById);

module.exports = postRoutes;