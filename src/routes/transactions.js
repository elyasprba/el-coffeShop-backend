const Router = require('express').Router();

const transactionsControllers = require('../controllers/transactions');

Router.post('/', transactionsControllers.createTransactionsControllers);

module.exports = Router;
