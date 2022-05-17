const jwt = require('jsonwebtoken');
const { errorResponse } = require('../helpers/response');
const { getEmailUsers } = require('../models/auth');

const checkDuplicate = (req, res, next) => {
   getEmailUsers(req.body.email)
      .then((result) => {
         if (result.rowCount > 0) {
            return errorResponse(res, 400, { msg: 'Email is alredy in use' });
         }
         next();
      })
      .catch((error) => {
         const { status, err } = error;
         errorResponse(res, status, err);
      });
};

const checkToken = (req, res, next) => {
   const bearertoken = req.header('Authorization');
   if (!bearertoken) {
      return errorResponse(res, 401, { msg: 'Sign in needed' });
   }
   const token = bearertoken.split(' ')[1];
   jwt.verify(token, process.env.JWT_SECRET, { issuer: process.env.JWT_ISSUER }, (err, payload) => {
      if (err && err.name === 'TokenExpiredError') {
         return errorResponse(res, 401, { msg: 'You need to sign in again' });
      }
      req.userPayload = payload;
      next();
   });
};

const roleAdmin = (req, res, next) => {
   const { role } = req.userPayload;
   if (role !== 'admin') {
      return res.status(401).json({
         err: { msg: 'You are not an admin' },
         data: [],
      });
   }
   next();
};

const roleUser = (req, res, next) => {
   const { role } = req.userPayload;
   if (role !== 'user') {
      return res.status(401).json({
         err: { msg: 'You are not user' },
         data: [],
      });
   }
   next();
};

module.exports = {
   checkDuplicate,
   checkToken,
   roleAdmin,
   roleUser,
};
