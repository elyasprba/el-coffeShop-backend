const Router = require('express').Router();

const productsControllers = require('../controllers/products');
const { checkToken } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

Router.post('/', checkToken, upload.single('pict'), productsControllers.postNewProducts);
Router.get('/all', productsControllers.getProducts);
Router.get('/fav', productsControllers.getProductsFavoriteControllers);
Router.get('/', productsControllers.findProductsControllers);
Router.delete('/:id', productsControllers.deleteProductsControllers);
Router.get('/sort', productsControllers.shortItems);
Router.get('/:category', productsControllers.filterCategoryProductsControllers);
Router.patch('/:id', checkToken, upload.single('pict'), productsControllers.patchProductsControllers);

module.exports = Router;
