const userModels = require('../models/users');
const { createUsers, getAllusers, findUsers, deleteUsers, updateUsers } = userModels;

const postUsersControllers = (req, res) => {
   createUsers(req.body)
      .then((data) => {
         res.status(200).json({
            msg: 'Created users success',
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
   const id = req.userPayload.id;
   const { file = null } = req;
   updateUsers(id, file, req.body)
      .then((result) => {
         const { data } = result;
         res.status(200).json({
            msg: 'Update successfull',
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

// const patchUsersControllersNew = (req, res) => {
//    const id = req.userPayload.id;
//    const { file = null } = req;
//    updateUsersNew(id, file, req.body)
//       .then((data) => {
//          res.status(200).json({
//             msg: 'Update successfull',
//             data,
//          });
//       })
//       .catch((err) => {
//          res.status(500).json({
//             err,
//             data: [],
//          });
//       });
// };

const findUsersControllers = (req, res) => {
   const id = req.params.id;
   findUsers(id)
      .then(({ data }) => {
         // const { data } = result;
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
   findUsersControllers,
   patchUsersControllers,
   deleteUsersControllers,
};
