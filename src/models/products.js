const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createProducts = (body) => {
   return new Promise((resolve, reject) => {
      const { name, description, price, size, pict, stock } = body;
      const id = uuidv4();
      const timestemp = new Date(Date.now());
      const sqlQuery = 'INSERT INTO products(id, name, description, price, size, pict, stock, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
      db.query(sqlQuery, [id, name, description, price, size, pict, stock, timestemp])
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

const findProducts = (query) => {
   return new Promise((resolve, reject) => {
      const name = query.name;
      let sqlQuery = 'SELECT * FROM products where lower(name) like lower($1)';
      db.query(sqlQuery, [`%${name}%`])
         .then((result) => {
            if (result.rows.length === 0) {
               return reject({ status: 500, msg: 'Products Not Found' });
            }
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
      const { name, description, size, pict, stock, delivery_info, category, price, time } = body;
      const sqlQuery = "UPDATE products SET name = coalesce(nullif($1, ''), name ), description = coalesce(nullif($2, ''), description ), size = coalesce(nullif($3, ''), size ), pict = coalesce(nullif($4, ''), pict ), stock = coalesce(nullif($5, '')::int8, stock ), delivery_info = coalesce(nullif($6, ''), delivery_info ), category  = coalesce(nullif($7, ''), category  ), price = coalesce(nullif($8, '')::int8, price), time = coalesce(nullif($9, '')::timestamp, time) WHERE id=$10 returning *";
      db.query(sqlQuery, [name, description, size, pict, stock, delivery_info, category, price, time, id])
         .then(({ rows }) => {
            const response = {
               data: rows[0],
            };
            resolve(response);
         })
         .catch((err) => {
            reject({
               status: 500,
               msg: 'salah input',
               err,
            });
         });
   });
};

const deleteProducts = (id) => {
   return new Promise((resolve, reject) => {
      const sqlQuery = 'DELETE FROM products WHERE id=$1 RETURNING *';
      db.query(sqlQuery, [id])
         .then((data) => {
            if (data.rows.length === 0) {
               return reject({
                  status: 404,
                  err: 'Products Not Found',
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

const filterCategoryProducts = (category) => {
   return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT name, price, category FROM products where category = $1';
      db.query(sqlQuery, [category])
         .then((data) => {
            if (data.rows.length === 0) {
               return reject({ status: 404, err: 'Category Not Found' });
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

const sortProductsBy = (query) => {
   return new Promise((resolve, reject) => {
      const { name, sort, sortBy } = query;
      let sqlQuery = 'select name, price, time from products where lower(name) like lower($1)';
      if (sort) {
         sqlQuery += ' order by ' + sortBy + ' ' + sort;
      }
      db.query(sqlQuery, [`%${name}%`])
         .then((result) => {
            if (result.rows.length === 0) {
               return reject({ status: 404, err: 'Products Not Found' });
            }
            const response = {
               total: result.rowCount,
               data: result.rows,
            };
            resolve(response);
         })
         .catch((err) => {
            reject({ status: 500, err });
         });
   });
};

const sortProductsFavorite = () => {
   return new Promise((resolve, reject) => {
      db.query('select transactions.name_products, products.price from transactions join products on transactions.name_products = products.name group by transactions.name_products, products.price order by count(*) desc')
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

module.exports = {
   createProducts,
   getAllProducts,
   findProducts,
   updateProducts,
   deleteProducts,
   sortProductsBy,
   filterCategoryProducts,
   sortProductsFavorite,
};
