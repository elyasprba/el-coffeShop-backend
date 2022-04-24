const productsModels = require('../models/products');

const { getAllProducts, createProducts } = productsModels;

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

module.exports = {
   postNewProducts,
   getProducts,
};
