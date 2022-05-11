const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../helpers/response');
const { register } = require('../models/auth');

const registerControllers = (req, res) => {
   const {
      body: { email, password, phone_number },
   } = req;
   bcrypt
      .hash(password, 10)
      .then((hashPassword) => {
         register(hashPassword, email, phone_number)
            .then(() => {
               successResponse(res, 201, { msg: 'Register Succsessfull' }, 0);
            })
            .catch((err) => {
               errorResponse(res, 500, { msg: 'Register is not succsess' }, err);
            });
      })
      .catch((err) => {
         errorResponse(res, 500, err);
      });
};

module.exports = {
   registerControllers,
};
