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

module.exports = { checkDuplicate };
