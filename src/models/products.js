const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createProducts = (body, file) => {
   return new Promise((resolve, reject) => {
      const { name, description, size, delivery_info, category, price } = body;
      const id = uuidv4();
      const created_at = new Date(Date.now());
      const pict = file.path.replace('public', '').replace(/\\/g, '/');
      const sqlQuery = 'INSERT INTO products(id, name, description, size, delivery_info, category, price, pict, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      db.query(sqlQuery, [id, name, description, size, delivery_info, category, price, pict, created_at])
         .then((result) => {
            const response = {
               data: result.rows[0],
            };
            resolve(response);
         })
         .catch((err) => {
            reject({ status: 500, err });
         });
   });
};

// const getAllProducts = (query) => {
//    return new Promise((resolve, reject) => {
//       const { page = 1, limit = 5 } = query;
//       const offset = (parseInt(page) - 1) * Number(limit);
//       db.query('SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2', [Number(limit), offset])
//          .then((result) => {
//             const response = {
//                data: result.rows,
//             };
//             db.query('SELECT COUNT(*) AS count_products FROM products')
//                .then((result) => {
//                   response.totalData = parseInt(result.rows[0]['count_products']);
//                   response.totalPage = Math.ceil(response.totalData / parseInt(limit));
//                   resolve(response);
//                })
//                .catch((err) => {
//                   reject({
//                      status: 500,
//                      err,
//                   });
//                });
//          })
//          .catch((err) => {
//             reject({
//                status: 500,
//                err,
//             });
//          });
//    });
// };

const getProductsFromServer = (query) => {
   return new Promise((resolve, reject) => {
      const { name, category_name, order, sort, page = 1, limit = 5 } = query;
      let parameterized = [];
      let sqlQuery = 'select count(*) over() as total, products.name, products.price, category.name as category_name FROM products join category on products.category = category.id';
      if (name && !category_name) {
         sqlQuery += " WHERE LOWER(products.name) LIKE LOWER('%' || $1 || '%')";
         parameterized.push(name);
      }
      if (!name && category_name) {
         sqlQuery += ' WHERE LOWER(category.name) = $1';
         parameterized.push(category_name);
      }
      if (name && category_name) {
         sqlQuery += " WHERE LOWER(products.name) LIKE LOWER('%' || $1 || '%') AND LOWER(category.name) = $2";
         parameterized.push(name, category_name);
      }
      if (sort) {
         sqlQuery += ' order by ' + sort + ' ' + order;
      }
      const offset = (parseInt(page) - 1) * Number(limit);
      sqlQuery += ` limit $${parameterized.length + 1} offset $${parameterized.length + 2}`;
      parameterized.push(limit, offset);
      db.query(sqlQuery, parameterized)
         .then((result) => {
            if (result.rows.length === 0) {
               return reject({
                  status: 404,
                  err: 'Products Not Found',
               });
            }
            const totalData = result.rows[0].total;
            const response = {
               totalPage: Math.ceil(totalData / limit),
               totalData,
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

// const findProducts = (query) => {
//    return new Promise((resolve, reject) => {
//       const name = query.name;
//       let sqlQuery = 'SELECT * FROM products where lower(name) like lower($1)';
//       db.query(sqlQuery, [`%${name}%`])
//          .then((result) => {
//             if (result.rows.length === 0) {
//                return reject({ status: 500, msg: 'Products Not Found' });
//             }
//             const response = {
//                total: result.rowCount,
//                data: result.rows,
//             };
//             resolve(response);
//          })
//          .catch((err) => {
//             reject({
//                status: 500,
//                err,
//             });
//          });
//    });
// };

const updateProducts = (id, file, body) => {
   return new Promise((resolve, reject) => {
      // name, description, size, pict, stock, delivery_info, category, price,
      const { name, description, size, stock, delivery_info, category, price } = body;
      const updated_at = new Date(Date.now());
      let pict = null;
      if (file !== null) {
         pict = file.path.replace('public', '').replace(/\\/g, '/');
      }
      const sqlQuery = "UPDATE products SET name = coalesce(nullif($1, ''), name), description = coalesce(nullif($2, ''), description), size = coalesce(nullif($3, ''), size), stock = coalesce(nullif($4, '')::int8, stock), delivery_info = coalesce(nullif($5, ''), delivery_info), category = coalesce(nullif($6, ''), category), price = coalesce(nullif($7, '')::int8, price), pict = coalesce($8, pict), updated_at = $9 WHERE id = $10 returning *";
      db.query(sqlQuery, [name, description, size, stock, delivery_info, category, price, pict, updated_at, id])
         .then((result) => {
            const response = {
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

// const filterCategoryProducts = (category) => {
//    return new Promise((resolve, reject) => {
//       const sqlQuery = 'SELECT name, price, category FROM products where category = $1';
//       db.query(sqlQuery, [category])
//          .then((data) => {
//             if (data.rows.length === 0) {
//                return reject({ status: 404, err: 'Category Not Found' });
//             }
//             const response = {
//                data: data.rows,
//             };
//             resolve(response);
//          })
//          .catch((err) => {
//             reject({ status: 500, err });
//          });
//    });
// };

// const sortProductsBy = (query) => {
//    return new Promise((resolve, reject) => {
//       const { name, sort, sortBy } = query;
//       let sqlQuery = 'select name, price, time from products where lower(name) like lower($1)';
//       if (sort) {
//          sqlQuery += ' order by ' + sortBy + ' ' + sort;
//       }
//       db.query(sqlQuery, [`%${name}%`])
//          .then((result) => {
//             if (result.rows.length === 0) {
//                return reject({ status: 404, err: 'Products Not Found' });
//             }
//             const response = {
//                msg: 'Update successfull',
//                total: result.rowCount,
//                data: result.rows,
//             };
//             resolve(response);
//          })
//          .catch((err) => {
//             reject({ status: 500, err });
//          });
//    });
// };

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
   updateProducts,
   deleteProducts,
   sortProductsFavorite,
   getProductsFromServer,
};
