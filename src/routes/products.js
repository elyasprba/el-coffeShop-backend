const Router = require('express').Router();

const productsControllers = require('../controllers/products');
const { checkToken, roleAdmin } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

Router.post('/', checkToken, roleAdmin, upload.single('pict'), productsControllers.postNewProducts);
Router.get('/all', productsControllers.getProducts);
Router.get('/:id', productsControllers.getProductsById);
Router.get('/fav', productsControllers.getProductsFavoriteControllers);
Router.delete('/:id', productsControllers.deleteProductsControllers);
Router.patch('/:id', checkToken, upload.single('pict'), productsControllers.patchProductsControllers);

module.exports = Router;
