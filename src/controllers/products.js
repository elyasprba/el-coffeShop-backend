const productsModels = require('../models/products');

const { createProducts, getAllProducts, findProducts, updateProducts, deleteProducts, sortProductsBy, filterCategoryProducts, sortProductsFavorite } = productsModels;

const postNewProducts = (req, res) => {
   createProducts(req.body)
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

const getProducts = (_, res) => {
   getAllProducts()
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
   updateProducts(req.params, req.body)
      .then((data) => {
         res.status(200).json({
            err: null,
            msg: 'Update Succsess',
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

module.exports = {
   postNewProducts,
   getProducts,
   findProductsControllers,
   patchProductsControllers,
   deleteProductsControllers,
   shortItems,
   filterCategoryProductsControllers,
   getProductsFavoriteControllers,
};
