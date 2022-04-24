const Router = require('express').Router();

const userController = require('../controllers/users');

Router.post('/', userController.postUsersControllers);
Router.get('/all', userController.getUsersControllers);
Router.patch('/:id', userController.patchUsersControllers);
Router.delete('/:id', userController.deleteUsersControllers);

module.exports = Router;
