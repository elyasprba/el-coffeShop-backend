const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../helpers/response');
const { register, getPassByUserEmail } = require('../models/auth');

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

const login = async (req, res) => {
   try {
      const {
         body: { email, password },
      } = req;
      const data = await getPassByUserEmail(email);
      const result = await bcrypt.compare(password, data.password);
      if (!result) {
         return errorResponse(res, 400, { msg: 'Email or Password is wrong' });
      }
      const payload = {
         id: data.id,
         email,
      };
      const jwtOption = {
         issuer: process.env.JWT_ISSUER,
         expiresIn: '10s',
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOption);
      successResponse(res, 200, { email, token }, null);
   } catch (error) {
      const { status, err } = error;
      errorResponse(res, status, err);
   }
};

module.exports = {
   registerControllers,
   login,
};
