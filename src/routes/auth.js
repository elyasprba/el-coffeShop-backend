const Router = require('express').Router();

const authControllers = require('../controllers/auth');

Router.post('/new', authControllers.registerControllers);

Router.post('/', () => {});

module.exports = Router;
