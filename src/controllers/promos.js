const promosModels = require('../models/promos');

const { createPromos, getAllPromos, findPromos, updatePromos, deletePromos } = promosModels;

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

const getPromosControllers = (_, res) => {
   getAllPromos()
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
