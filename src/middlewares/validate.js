const { check, validationResult } = require('express-validator');

const rulesCreateUser = [check('email').isEmail().notEmpty(), check('password').notEmpty(), check('phone_number').toInt().notEmpty()];

const validateCreateUsers = [
   rulesCreateUser,
   (req, res, next) => {
      const error = validationResult(req);

      if (!error.isEmpty()) {
         return res.status(400).json({
            msg: 'Query must contain email, password and phone_number',
         });
      }
      next();
   },
];

const validateUpdateData = (req, res, next) => {
   const { body } = req;
   const validBody = Object.keys(body).filter((key) => key === 'password' || key === 'phone_number' || key === 'pict' || key === 'display_name' || key === 'first_name' || key === 'last_name' || key === 'birthday_date' || key === 'address' || key === 'gender');
   if (validBody.length < 9) {
      return res.status(400).json({
         err: 'Body harus berisikan data lengkap',
      });
   }
   next();
};

module.exports = {
   validateCreateUsers,
   validateUpdateData,
};
