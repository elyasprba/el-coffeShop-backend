const productsModels = require('../models/products');
const { createProducts, getAllProducts, findProducts, updateProducts, deleteProducts, sortProductsBy, filterCategoryProducts, sortProductsFavorite, getProductsFromServer } = productsModels;

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

const getProducts = (req, res) => {
   getAllProducts(req.query)
      .then((result) => {
         const { totalData, totalPage, data } = result;
         const { limit = 1, page = 3 } = req.query;
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

const findProductsControllers = (req, res) => {
   findProducts(req.query)
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

const filterCategoryProductsControllers = (req, res) => {
   const category = req.params.category;
   filterCategoryProducts(category)
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

const shortItems = (req, res) => {
   sortProductsBy(req.query)
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

const getProductsFromServerControllers = (req, res) => {
   getProductsFromServer(req.query)
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

module.exports = {
   postNewProducts,
   getProducts,
   findProductsControllers,
   patchProductsControllers,
   deleteProductsControllers,
   shortItems,
   filterCategoryProductsControllers,
   getProductsFavoriteControllers,
   getProductsFromServerControllers,
};
