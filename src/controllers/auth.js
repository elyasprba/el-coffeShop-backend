const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../helpers/response');
const { register, getPassByUserEmail } = require('../models/auth');
const { client } = require('../config/redis');
const generator = require('generate-password');
const { sendPasswordConfirmation } = require('../config/nodmailer');

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
         role: data.role,
         address: data.address,
         name: data.display_name,
         phone_number: data.phone_number,
         pict: data.pict,
      };
      const jwtOption = {
         issuer: process.env.JWT_ISSUER,
         expiresIn: '100000000000s',
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOption);
      successResponse(res, 200, { msg: 'Login Succsessfull', token, payload }, null);
   } catch (error) {
      const { status, err } = error;
      errorResponse(res, status, err);
   }
};

const forgotPassword = async (req, res) => {
   try {
      const { email } = req.params;
      const confirmCode = generator.generate({
         length: 6,
         numbers: true,
      });
      await sendPasswordConfirmation(email, confirmCode);
      await client.set(`forgotpass${email}`, confirmCode);
      res.status(200).json({
         msg: 'Please check your email for password confirmation',
      });
   } catch (error) {
      const { message, status } = error;
      res.status(status ? status : 500).json({
         error: message,
      });
   }
};

module.exports = {
   registerControllers,
   login,
   forgotPassword,
};
