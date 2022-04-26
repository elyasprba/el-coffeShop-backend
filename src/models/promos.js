const db = require('../config/db');

const createPromos = (body) => {
   return new Promise((resolve, reject) => {
      const { name, price, description, size, coupon_code, discount, pict } = body;
      const sqlQuery = 'INSERT INTO promos (name, price, description, size, coupon_code, discount, pict) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      db.query(sqlQuery, [name, price, description, size, coupon_code, discount, pict])
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

const getAllPromos = () => {
   return new Promise((resolve, reject) => {
      db.query('SELECT *  FROM promos')
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

const findPromos = (query) => {
   return new Promise((resolve, reject) => {
      const { coupon_code } = query;
      let sqlQuery = 'SELECT * FROM promos where lower(coupon_code) like lower($1)';
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
      const { name, price, description, size, coupon_code, discount, pict } = body;
      const sqlQuery = 'UPDATE promos SET name=$1, price=$2, description=$3, size=$4, coupon_code=$5, discount=$6, pict=$7 WHERE id=$8 RETURNING *';
      db.query(sqlQuery, [name, price, description, size, coupon_code, discount, pict, id])
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
