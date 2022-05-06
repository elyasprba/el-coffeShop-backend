const db = require('../config/db');

const createTransactions = (body) => {
   return new Promise((resolve, reject) => {
      const { name_products, qty, size, subtotal, tax, shipping, total, address_details } = body;
      const sqlQuery = 'INSERT INTO transactions (name_products, qty, size, subtotal, tax, shipping, total,address_details) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
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

const getSingleTransactions = (id) => {
   return new Promise((resolve, reject) => {
      const sqlQuery = 'select * from transactions where id = $1';
      db.query(sqlQuery, [id])
         .then((data) => {
            if (data.rows.length === 0) {
               return reject({ status: 404, err: ' Not Found' });
            }
            const response = {
               data: data.rows,
            };
            resolve(response);
         })
         .catch((err) => {
            reject({ status: 500, err });
         });
   });
};

const updateTransactions = (params, body) => {
   return new Promise((resolve, reject) => {
      const { id } = params;
      const { name_products, qty, size, subtotal, tax, shipping, total } = body;
      const sqlQuery = "UPDATE transactions SET name_products = coalesce(nullif($1, ''), name_products ), qty = coalesce(nullif($2, '')::int4, qty ), size = coalesce(nullif($3, ''), size ), subtotal = coalesce(nullif($4, '')::int4, subtotal ), tax = coalesce(nullif($5, '')::int4, tax ), shipping = coalesce(nullif($6, '')::int4, shipping ), total = coalesce(nullif($7, '')::int4, total ) WHERE id = $8 returning *";
      db.query(sqlQuery, [name_products, qty, size, subtotal, tax, shipping, total, id])
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

const deleteTransactions = (id) => {
   return new Promise((resolve, reject) => {
      const sqlQuery = 'DELETE FROM transactions WHERE id=$1 RETURNING *';
      db.query(sqlQuery, [id])
         .then((data) => {
            if (data.rows.length === 0) {
               return reject({
                  status: 404,
                  err: 'Transactions Not Found',
               });
            }
            const response = {
               data: data.rows,
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
   getSingleTransactions,
   updateTransactions,
   deleteTransactions,
};
