const Router = require('express').Router();

const promosControllers = require('../controllers/promos');

Router.post('/', promosControllers.postPromosControllers);
Router.get('/all', promosControllers.getPromosControllers);
Router.get('/', promosControllers.findPromosControllers);
Router.patch('/:id', promosControllers.patchPromosControllers);
Router.delete('/:id', promosControllers.deletePromosControllers);

module.exports = Router;
