const userModels = require('../models/users');

const { createUsers, getAllusers, updateUsers, deleteUsers } = userModels;

const postUsersControllers = (req, res) => {
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

const getUsersControllers = (_, res) => {
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

const patchUsersControllers = (req, res) => {
   updateUsers(req.params, req.body)
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

const deleteUsersControllers = (req, res) => {
   const { id } = req.params;
   deleteUsers(id)
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
   postUsersControllers,
   getUsersControllers,
   patchUsersControllers,
   deleteUsersControllers,
};
