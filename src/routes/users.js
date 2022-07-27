const Router = require('express').Router();

const userController = require('../controllers/users');
const validate = require('../middlewares/validate');
const { checkToken, roleAdmin } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

Router.post('/', validate.validateCreateUsers, userController.postUsersControllers);
Router.get('/all', checkToken, roleAdmin, userController.getUsersControllers);
Router.get('/profile-detail', checkToken, userController.findUsersControllers);
Router.patch('/', checkToken, upload, userController.patchUsersControllers);
Router.patch('/edit-password', checkToken, userController.patchUserInfoControllers);
Router.delete('/:id', userController.deleteUsersControllers);
Router.patch('/update-password', userController.patchUserPassword);

module.exports = Router;
