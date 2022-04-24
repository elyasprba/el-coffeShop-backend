const Router = require('express').Router();

const usersRouter = require('./users');
const productsRouter = require('./products');

Router.use('/users', usersRouter);
Router.use('/products', productsRouter);

module.exports = Router;
