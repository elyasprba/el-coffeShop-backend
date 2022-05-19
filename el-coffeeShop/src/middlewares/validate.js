const { check, validationResult } = require('express-validator');

// email, password, phone_number, pict, display_name, first_name, last_name, address, gender, birthday_date
const rulesCreateUsers = [check('email').isEmail().notEmpty().trim().escape(), check('password').notEmpty(), check('phone_number').isNumeric().notEmpty()];

const validateCreateUsers = [
   rulesCreateUsers,
   (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
         return res.status(400).json({
            msg: 'Create users invalid',
            error: error.array(),
         });
      }
      next();
   },
];

module.exports = {
   validateCreateUsers,
};
