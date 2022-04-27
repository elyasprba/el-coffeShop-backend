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

const findProducts = (query) => {
   return new Promise((resolve, reject) => {
      const name = query.name;
      let sqlQuery = 'SELECT * FROM products where lower(name) like lower($1)';
      db.query(sqlQuery, [`%${name}%`])
         .then((result) => {
            if (result.rows.length === 0) {
               return reject({ status: 500, err: 'Products Not Found' });
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
      const { name, description, price, size, pict, stock, delivery_info, category, time } = body;
      const sqlQuery = 'UPDATE products SET name=$1, description=$2, price=$3, size=$4, pict=$5, stock=$6, delivery_info=$7, category=$8, time=$9 WHERE id=$10 RETURNING *';
      db.query(sqlQuery, [name, description, price, size, pict, stock, delivery_info, category, time, id])
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
      const sqlQuery = 'SELECT * FROM products where category = $1';
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
      const { name, choice, shortBy } = query;
      let sqlQuery = 'select * from products where lower(name) like lower($1)';
      if (choice) {
         sqlQuery += ' order by ' + shortBy + ' ' + choice;
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
