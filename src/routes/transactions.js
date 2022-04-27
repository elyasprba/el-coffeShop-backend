const Router = require('express').Router();

const transactionsControllers = require('../controllers/transactions');

Router.post('/', transactionsControllers.createTransactionsControllers);
Router.get('/:id', transactionsControllers.getSingleTransactionsControllers);
Router.patch('/:id', transactionsControllers.updateTransactionsControllers);
Router.delete('/:id', transactionsControllers.deleteControllersControllers);
module.exports = Router;
