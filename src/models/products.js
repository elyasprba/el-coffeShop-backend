const db = require('../config/db');

const createProducts = (body) => {
   return new Promise((resolve, reject) => {
      const { name, description, price, size, pict, stock } = body;
      const sqlQuery = 'INSERT INTO products(name, description, price, size, pict, stock) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      db.query(sqlQuery, [name, description, price, size, pict, stock])
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

const getAllProducts = () => {
   return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products')
         .then((result) => {
            const response = {
               total: result.rowCount,
               data: result.rows,
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

const updateProducts = (params, body) => {
   return new Promise((resolve, reject) => {
      const { id } = params;
      const { name, description, price, size, pict, stock, delivery_info } = body;
      const sqlQuery = 'UPDATE products SET name=$1, description=$2, price=$3, size=$4, pict=$5, stock=$6, delivery_info=$7 WHERE id=$8 RETURNING *';
      db.query(sqlQuery, [name, description, price, size, pict, stock, delivery_info, id])
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
   createProducts,
   getAllProducts,
   updateProducts,
};
