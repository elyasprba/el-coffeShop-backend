const userModels = require('../models/users');

const { createUsers, getAllusers } = userModels;

const postNewUsers = (req, res) => {
   createUsers(req.body)
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

const getUsers = (req, res) => {
   getAllusers()
      .then((result) => {
         const { total, data } = result;
         res.status(200).json({
            data,
            total,
            err: null,
         });
      })
      .catch((error) => {
         const { err, status } = error;
         res.status(status).json({
            err,
            data: [],
         });
      });
};

module.exports = {
   postNewUsers,
   getUsers,
};
