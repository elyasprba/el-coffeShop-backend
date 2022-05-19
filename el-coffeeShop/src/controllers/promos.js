const { createPromos, getAllPromos, findPromos, updatePromos, deletePromos } = require('../models/promos');
const { successResponse } = require('../helpers/response');

const postPromosControllers = (req, res) => {
   createPromos(req.body)
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

const getPromosControllers = (req, res) => {
   getAllPromos(req.query)
      .then((result) => {
         const { totalData, totalPage, data } = result;
         const { limit = 1, page = 2 } = req.query;
         const nextPage = Number(page) + 1;
         const prevPage = Number(page) - 1;

         let next = `/promos${req.path}?`;
         let prev = `/promos${req.path}?`;
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

const findPromosControllers = (req, res) => {
   findPromos(req.query)
      .then(({ data, total }) => {
         res.status(200).json({
            err: null,
            data,
            total,
         });
      })
      .catch(({ status, err }) => {
         res.status(status).json({
            data: [],
            err,
         });
      });
};

const patchPromosControllers = (req, res) => {
   updatePromos(req.params, req.body)
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

const deletePromosControllers = (req, res) => {
   const { id } = req.params;
   deletePromos(id)
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
   postPromosControllers,
   getPromosControllers,
   findPromosControllers,
   patchPromosControllers,
   deletePromosControllers,
};
