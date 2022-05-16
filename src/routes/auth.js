const Router = require('express').Router();

const authControllers = require('../controllers/auth');
const { checkDuplicate } = require('../middlewares/auth');
const { validateCreateUsers } = require('../middlewares/validate');

Router.post('/register', validateCreateUsers, checkDuplicate, authControllers.registerControllers);
Router.post('/', authControllers.login);

module.exports = Router;
