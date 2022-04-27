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

module.exports = {
   validateCreateUsers,
};
