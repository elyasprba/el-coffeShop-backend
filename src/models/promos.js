const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createPromos = (body) => {
   return new Promise((resolve, reject) => {
      const { name, price, description, size, coupon_code, discount, pict } = body;
      const id = uuidv4();
      const timestemp = new Date(Date.now());
      const sqlQuery = 'INSERT INTO promos (id, name, price, description, size, coupon_code, discount, pict, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      db.query(sqlQuery, [id, name, price, description, size, coupon_code, discount, pict, timestemp])
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

const getAllPromos = (query) => {
   return new Promise((resolve, reject) => {
      const { page = 1, limit = 2 } = query;
      const offset = (Number(page) - 1) * Number(limit);
      db.query('SELECT * FROM promos ORDER BY id LIMIT $1 OFFSET $2', [Number(limit), offset])
         .then((result) => {
            const response = {
               data: result.rows,
            };
            db.query('SELECT COUNT(*) AS count_promos FROM promos')
               .then((result) => {
                  response.totalData = Number(result.rows[0]['count_promos']);
                  response.totalPage = Math.ceil(response.totalData / Number(limit));
                  resolve(response);
               })
               .catch((err) => {
                  reject({
                     status: 500,
                     err,
                  });
               });
         })
         .catch((err) =>
            reject({
               status: 500,
               err,
            })
         );
   });
};

const findPromos = (query) => {
   return new Promise((resolve, reject) => {
      const { coupon_code } = query;
      let sqlQuery = 'SELECT name, price, description, coupon_code FROM promos where lower(coupon_code) like lower($1)';
      db.query(sqlQuery, [`%${coupon_code}%`])
         .then((result) => {
            if (result.rows.length === 0) {
               return reject({ status: 500, err: 'Coupon Not Found' });
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

const updatePromos = (params, body) => {
   return new Promise((resolve, reject) => {
      const { id } = params;
      const { name, price, description, pict, size, coupon_code, discount } = body;
      const sqlQuery = "UPDATE promos SET name = coalesce(nullif($1, ''), name ), price = coalesce(nullif($2, '')::int4, price ), description = coalesce(nullif($3, ''), description ), pict = coalesce(nullif($4, ''), pict ), size = coalesce(nullif($5, ''), size ), coupon_code = coalesce(nullif($6, ''), coupon_code ), discount = coalesce(nullif($7, '')::int4, discount ) WHERE id = $8 returning *;";
      db.query(sqlQuery, [name, price, description, pict, size, coupon_code, discount, id])
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

const deletePromos = (id) => {
   return new Promise((resolve, reject) => {
      const sqlQuery = 'DELETE FROM promos WHERE id=$1 RETURNING *';
      db.query(sqlQuery, [id])
         .then((data) => {
            if (data.rows.length === 0) {
               return reject({
                  status: 404,
                  err: 'Users Not Found',
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
   createPromos,
   getAllPromos,
   findPromos,
   updatePromos,
   deletePromos,
};
