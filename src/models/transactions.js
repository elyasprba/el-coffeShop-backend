const db = require('../config/db');

const createTransactions = (body) => {
   return new Promise((resolve, reject) => {
      const { name_products, qty, size, subtotal, tax, shipping, total, address_details } = body;
      const sqlQuery = 'INSERT INTO transactions (name_products, qty, size, subtotal, tax, shipping, total,address_details) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

      //       INSERT INTO transactions
      // (name_products, qty, "size", subtotal, tax, shipping, total, address_details)
      // VALUES('', 0, '', 0, 0, 0, 0, '');

      db.query(sqlQuery, [name_products, qty, size, subtotal, tax, shipping, total, address_details])
         .then(({ rows }) => {
            const response = {
               data: rows[0],
            };
            resolve(response);
         })
         .catch((err) => {
            reject({
               status: 500,
               err,
            });
         });
   });
};

module.exports = {
   createTransactions,
};
