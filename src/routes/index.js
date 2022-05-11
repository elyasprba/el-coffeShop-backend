const Router = require('express').Router();

const usersRouter = require('./users');
const productsRouter = require('./products');
const transactionsRouter = require('./transactions');
const promosRouter = require('./promos');
const authRouter = require('./auth');

Router.use('/users', usersRouter);
Router.use('/products', productsRouter);
Router.use('/transactions', transactionsRouter);
Router.use('/promos', promosRouter);
Router.use('/auth', authRouter);

module.exports = Router;
