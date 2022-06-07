const Router = require('express').Router();

const transactionsControllers = require('../controllers/transactions');
const { checkToken, roleUser } = require('../middlewares/auth');

Router.post('/', checkToken, roleUser, transactionsControllers.createTransactionsControllers);
Router.get('/', checkToken, transactionsControllers.getSingleTransactionsControllers);
Router.patch('/:id', transactionsControllers.updateTransactionsControllers);
Router.delete('/:id', transactionsControllers.deleteControllersControllers);

module.exports = Router;
