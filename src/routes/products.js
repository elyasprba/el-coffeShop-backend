const Router = require('express').Router();

const productsControllers = require('../controllers/products');

Router.post('/', productsControllers.postNewProducts);
Router.get('/all', productsControllers.getProducts);
Router.get('/', productsControllers.findProductsControllers);
Router.patch('/:id', productsControllers.patchProductsControllers);
Router.delete('/:id', productsControllers.deleteProductsControllers);
Router.get('/short', productsControllers.shortItems);
Router.get('/:category', productsControllers.filterCategoryProductsControllers);

module.exports = Router;
