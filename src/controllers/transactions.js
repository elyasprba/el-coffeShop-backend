const transactionsModels = require('../models/transactions');

const { createTransactions } = transactionsModels;

const createTransactionsControllers = (req, res) => {
   createTransactions(req.body)
      .then((data) => {
         res.status(200).json({
            err: null,
            data,
         });
      })
      .catch((err) => {
         res.status(500).json({
            err,
            data: [],
         });
      });
};

module.exports = {
   createTransactionsControllers,
};
