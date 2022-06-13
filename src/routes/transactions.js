const Router = require('express').Router();

const transactionsControllers = require('../controllers/transactions');
const { checkToken } = require('../middlewares/auth');

Router.post('/', checkToken, transactionsControllers.createTransactionsControllers);
Router.get('/', checkToken, transactionsControllers.getSingleTransactionsControllers);
Router.patch('/:id', transactionsControllers.updateTransactionsControllers);
Router.delete('/:id', transactionsControllers.deleteControllersControllers);

module.exports = Router;
