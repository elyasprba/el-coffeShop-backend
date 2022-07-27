const transactionsModels = require('../models/transactions');
const { messaging } = require('../config/firebase');
const notif = messaging();
const { createTransactions, getSingleTransactions, updateTransactions, deleteTransactions } = transactionsModels;

// const createTransactionsControllers = (req, res) => {
//    createTransactions(req.body)
//       .then((data) => {
//          res.status(200).json({
//             err: null,
//             data,
//          });
//       })
//       .catch((err) => {
//          console.log(err);
//          res.status(500).json({
//             err,
//             data: [],
//          });
//       });
// };

const createTransactionsControllers = async (req, res) => {
   try {
      const { body } = req;
      const msg = {
         token: process.env.TOKEN_NOTIF,
         notification: {
            body: `User ${body.users_id} Created Transaction`,
            title: 'TRANSACTION',
         },
      };
      const result = await createTransactions(req.body);
      const { data } = result;
      await notif.send(msg);
      return res.status(200).json({
         msg: 'Payment Successfull',
         err: null,
         data,
      });
   } catch (err) {
      res.status(500).json({
         err,
         data: [],
      });
   }
};

const getSingleTransactionsControllers = (req, res) => {
   const id = req.userPayload.id;
   getSingleTransactions(id)
      .then(({ data }) => {
         res.status(200).json({
            data,
            err: null,
         });
      })
      .catch((error) => {
         const { err, status } = error;
         res.status(status).json({
            data: [],
            err,
         });
      });
};

const updateTransactionsControllers = (req, res) => {
   updateTransactions(req.params, req.body)
      .then((data) => {
         res.status(200).json({
            err: null,
            msg: 'Update Success',
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

const deleteControllersControllers = (req, res) => {
   const { id } = req.params;
   deleteTransactions(id)
      .then(({ data }) => {
         res.status(200).json({
            data,
            err: null,
         });
      })
      .catch((error) => {
         const { err, status } = error;
         res.status(status).json({
            data: [],
            err,
         });
      });
};

module.exports = {
   createTransactionsControllers,
   getSingleTransactionsControllers,
   updateTransactionsControllers,
   deleteControllersControllers,
};
