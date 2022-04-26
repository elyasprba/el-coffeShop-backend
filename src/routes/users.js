const Router = require('express').Router();

const userController = require('../controllers/users');
const validate = require('../middlewares/validate');

Router.post('/', validate.validateCreatUsers, userController.postUsersControllers);
Router.get('/all', userController.getUsersControllers);
Router.patch('/:id', userController.patchUsersControllers);
Router.delete('/:id', userController.deleteUsersControllers);

module.exports = Router;
