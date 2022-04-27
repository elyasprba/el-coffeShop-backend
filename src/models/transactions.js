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
      const { name_products, qty, size, subtotal, tax, shipping, total, address_details } = body;
      const sqlQuery = 'UPDATE transactions SET name_products=$1, qty=$2, size=$3, subtotal=$4, tax=$5, shipping=$6, total=$7, address_details=$8 WHERE id=$9 RETURNING *';
      db.query(sqlQuery, [name_products, qty, size, subtotal, tax, shipping, total, address_details, id])
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
