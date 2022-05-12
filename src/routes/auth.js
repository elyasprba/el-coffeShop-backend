const Router = require('express').Router();

const authControllers = require('../controllers/auth');
const { checkDuplicate } = require('../middlewares/auth');
const { validateCreateUsers } = require('../middlewares/validate');

Router.post('/new', validateCreateUsers, checkDuplicate, authControllers.registerControllers);

Router.post('/', () => {});

module.exports = Router;
