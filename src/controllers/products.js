const productsModels = require('../models/products');
const { createProducts, updateProducts, deleteProducts, sortProductsFavorite, getProductsFromServer, getSingleProductsFromServer } = productsModels;

const { successResponse } = require('../helpers/response');

const postNewProducts = (req, res) => {
   const { file = null } = req;
   createProducts(req.body, file)
      .then((result) => {
         const { data } = result;
         res.status(200).json({
            msg: 'Created Products Succsess',
            data,
            err: null,
         });
      })
      .catch((error) => {
         const { status, err } = error;
         res.status(status).json({
            data: [],
            err,
         });
      });
};

const getProductsById = (req, res) => {
   const { id } = req.params;
   getSingleProductsFromServer(id)
      .then((result) => {
         const { data } = result;
         res.status(200).json({
            data,
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

const getProducts = (req, res) => {
   getProductsFromServer(req.query)
      .then((result) => {
         const { totalPage, totalData, data } = result;
         data.forEach((data) => delete data.total);
         const { page = 1, limit = 12 } = req.query;
         const nextPage = Number(page) + 1;
         const prevPage = Number(page) - 1;

         let next = `/products${req.path}?`;
         let prev = `/products${req.path}?`;
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
         data.forEach((val) => delete val.total);
         res.status(200).json({
            data,
            meta,
            err: null,
         });
      })
      .catch((error) => {
         const { err } = error;
         res.status(500).json({
            err: error.message,
            data: [],
         });
      });
};

const patchProductsControllers = (req, res) => {
   const { id } = req.params;
   const { file = null } = req;
   updateProducts(id, file, req.body)
      .then((result) => {
         const { data } = result;
         res.status(200).json({
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

const deleteProductsControllers = (req, res) => {
   const { id } = req.params;
   deleteProducts(id)
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

const getProductsFavoriteControllers = (_, res) => {
   sortProductsFavorite()
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
   postNewProducts,
   getProducts,
   getProductsById,
   patchProductsControllers,
   deleteProductsControllers,
   getProductsFavoriteControllers,
};
