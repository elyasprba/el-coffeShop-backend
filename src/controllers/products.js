const productsModels = require('../models/products');

const { getAllProducts, createProducts, updateProducts, deleteProducts } = productsModels;

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

const patchProductsControllers = (req, res) => {
   updateProducts(req.params, req.body)
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

module.exports = {
   postNewProducts,
   getProducts,
   patchProductsControllers,
   deleteProductsControllers,
};