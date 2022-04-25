const Router = require('express').Router();

const productsControllers = require('../controllers/products');

Router.post('/', productsControllers.postNewProducts);
Router.get('/all', productsControllers.getProducts);
Router.patch('/:id', productsControllers.patchProductsControllers);

module.exports = Router;
