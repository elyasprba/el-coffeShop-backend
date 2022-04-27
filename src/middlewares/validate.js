const { check, validationResult } = require('express-validator');

const rules = [check('email').isEmail().bail().notEmpty().withMessage('The email is required'), check('password').exists().notEmpty().withMessage('The password is required'), check('phone_number').toInt().notEmpty().withMessage('The number phone is required')];

const validateCreateUsers = [
   rules,
   (req, res, next) => {
      const error = validationResult(req);

      if (!error.isEmpty()) {
         return res.status(422).json({
            error: error.array(),
         });
      }
      next();
   },
];

module.exports = {
   validateCreateUsers,
};
