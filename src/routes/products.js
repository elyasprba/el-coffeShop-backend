const Router = require('express').Router();

const productsControllers = require('../controllers/products');
const { checkToken } = require('../middlewares/auth');

Router.post('/', checkToken, productsControllers.postNewProducts);
Router.get('/all', productsControllers.getProducts);
Router.get('/fav', productsControllers.getProductsFavoriteControllers);
Router.get('/', productsControllers.findProductsControllers);
Router.patch('/:id', productsControllers.patchProductsControllers);
Router.delete('/:id', productsControllers.deleteProductsControllers);
Router.get('/sort', productsControllers.shortItems);
Router.get('/:category', productsControllers.filterCategoryProductsControllers);

module.exports = Router;
