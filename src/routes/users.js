const Router = require('express').Router();

const userController = require('../controllers/users');

Router.post('/', userController.postNewUsers);
Router.get('/all', userController.getUsers);

module.exports = Router;
