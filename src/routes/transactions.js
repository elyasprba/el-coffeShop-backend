const Router = require('express').Router();

const transactionControllers = require('../controllers/transaction');

Router.use('/', transactionControllers);
