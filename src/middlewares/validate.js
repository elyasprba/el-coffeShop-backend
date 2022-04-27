const { check, validationResult } = require('express-validator');

const rules = [check('email').isEmail().notEmpty(), check('password').notEmpty(), check('phone_number').toInt().notEmpty()];

const validateCreateUsers = [
   rules,
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
