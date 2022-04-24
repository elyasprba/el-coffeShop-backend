const Router = require('express').Router();

const userController = require('../controllers/users');

Router.post('/', userController.postNewUsers);
Router.get('/all', userController.getUsers);
Router.patch('/:id', userController.patchUpdateUsers);

module.exports = Router;
