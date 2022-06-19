const Router = require('express').Router();

const productsControllers = require('../controllers/products');
const { checkToken, roleAdmin } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

Router.post('/', checkToken, upload.single('pict'), productsControllers.postNewProducts);
Router.get('/', productsControllers.getProducts);
Router.get('/favorite', productsControllers.getProductsFavoriteControllers);
Router.get('/:id', productsControllers.getProductsById);
Router.delete('/:id', productsControllers.deleteProductsControllers);
Router.patch('/:id', checkToken, upload.single('pict'), productsControllers.patchProductsControllers);

module.exports = Router;
