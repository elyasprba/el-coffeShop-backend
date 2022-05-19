const userModels = require('../models/users');
const { createUsers, getAllusers, findUsers, deleteUsers, updateUsers } = userModels;
const { successResponse, errorResponse } = require('../helpers/response');

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

const getUsersControllers = (req, res) => {
   getAllusers(req.query)
      .then((result) => {
         const { totalData, totalPage, data } = result;
         const { limit = 1, page = 2 } = req.query;
         const nextPage = Number(page) + 1;
         const prevPage = Number(page) - 1;

         let next = `/users${req.path}?`;
         let prev = `/users${req.path}?`;
         if (limit) {
            next += `limit=${limit}&`;
            prev += `limit=${limit}&`;
         }
         if (page) {
            next += `page=${nextPage}`;
            prev += `page=${prevPage}`;
         }
         if (Number(page) == 1 && totalPage !== 1) {
            const meta = {
               totalData,
               totalPage,
               page: Number(page),
               next,
            };
            return successResponse(res, 200, data, meta);
         }
         if (Number(page) == totalPage && totalPage !== 1) {
            const meta = {
               totalData,
               totalPage,
               page: Number(page),
               prev,
            };
            return successResponse(res, 200, data, meta);
         }
         if (totalPage == 1) {
            const meta = {
               totalData,
               totalPage,
            };
            return successResponse(res, 200, data, meta);
         }
         const meta = {
            totalData,
            totalPage,
            next,
            prev,
         };
         res.status(200).json({
            data,
            meta,
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
