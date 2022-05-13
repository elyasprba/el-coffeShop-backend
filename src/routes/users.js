const Router = require('express').Router();

const userController = require('../controllers/users');
const validate = require('../middlewares/validate');
const { checkToken } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

Router.post('/', validate.validateCreateUsers, userController.postUsersControllers);
Router.get('/all', userController.getUsersControllers);
Router.get('/all/:id', userController.findUsersControllers);
// Router.patch('/:id', userController.patchUsersControllers);
Router.delete('/:id', userController.deleteUsersControllers);
Router.patch('/', checkToken, upload.single('pict'), userController.patchUsersControllers);

module.exports = Router;
