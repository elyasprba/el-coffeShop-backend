const Router = require('express').Router();

const userController = require('../controllers/users');
const validate = require('../middlewares/validate');
const { checkToken } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

Router.post('/', validate.validateCreateUsers, userController.postUsersControllers);
Router.get('/all', userController.getUsersControllers);
Router.get('/profile-detail', checkToken, userController.findUsersControllers);
Router.patch('/', checkToken, upload.single('pict'), userController.patchUsersControllers);
Router.delete('/:id', userController.deleteUsersControllers);

module.exports = Router;
