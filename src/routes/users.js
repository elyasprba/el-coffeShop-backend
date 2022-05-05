const Router = require('express').Router();

const userController = require('../controllers/users');
const validate = require('../middlewares/validate');

Router.post('/', validate.validateCreateUsers, userController.postUsersControllers);
Router.get('/all', userController.getUsersControllers);
Router.get('/all/:id', userController.findUsersControllers);
Router.patch('/:id', userController.patchUsersControllers);
Router.delete('/:id', userController.deleteUsersControllers);

module.exports = Router;
