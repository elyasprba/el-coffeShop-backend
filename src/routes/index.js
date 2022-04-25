const Router = require('express').Router();

const usersRouter = require('./users');
const productsRouter = require('./products');
const transactionsRouter = require('./transactions');

Router.use('/users', usersRouter);
Router.use('/products', productsRouter);
Router.use('/transactions', transactionsRouter);

module.exports = Router;
