const Router = require('express').Router();

const usersRouter = require('./users');
const productsRouter = require('./products');
const transactionsRouter = require('./transactions');
const promosRouter = require('./promos');
const authRouter = require('./auth');
const notif = require('./notif');

Router.get('/', (req, res) => {
   res.json({
      message: 'Welcome el-CoffeeShop',
   });
});

Router.get('*', (req, res) => {
   res.json({
      message: 'Api Not Found',
   });
});

Router.use('/users', usersRouter);
Router.use('/products', productsRouter);
Router.use('/transactions', transactionsRouter);
Router.use('/promos', promosRouter);
Router.use('/auth', authRouter);
Router.use('/notif', notif);

module.exports = Router;
