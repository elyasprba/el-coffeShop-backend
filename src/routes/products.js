const Router = require('express').Router();

const productsControllers = require('../controllers/products');
const { checkToken } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

Router.post('/', checkToken, upload, productsControllers.postNewProducts);
Router.get('/', productsControllers.getProducts);
Router.get('/favorite', productsControllers.getProductsFavoriteControllers);
Router.get('/:id', productsControllers.getProductsById);
Router.delete('/:id', productsControllers.deleteProductsControllers);
Router.patch('/:id', checkToken, upload, productsControllers.patchProductsControllers);

module.exports = Router;
