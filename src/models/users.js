const db = require('../config/db');

const createUsers = (body) => {
   return new Promise((resolve, reject) => {
      const { email, password, phone_number } = body;
      const sqlQuery = 'INSERT INTO users(email, password, phone_number) VALUES ($1, $2, $3) RETURNING *';
      db.query(sqlQuery, [email, password, phone_number])
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

const getAllusers = () => {
   return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users')
         .then((result) => {
            const response = {
               total: result.rowCount,
               data: result.rows,
            };
            resolve(response);
         })
         .catch((err) =>
            reject({
               status: 500,
               err,
            })
         );
   });
};

const updateUsers = (params, body) => {
   return new Promise((resolve, reject) => {
      const { id } = params;
      const { email, password, phone_number } = body;
      const sqlQuery = 'UPDATE users SET email=$1, password=$2, phone_number=$3 WHERE id=$4 RETURNING *';
      db.query(sqlQuery, [email, password, phone_number, id])
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

const deleteUsers = (id) => {
   return new Promise((resolve, reject) => {
      const sqlQuery = 'DELETE FROM users WHERE id=$1 RETURNING *';
      db.query(sqlQuery, [id])
         .then((data) => {
            if (data.rows.length === 0) {
               return reject({ status: 404, err: 'Users Not Found' });
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
   createUsers,
   getAllusers,
   updateUsers,
   deleteUsers,
};
