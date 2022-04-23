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

module.exports = {
   createUsers,
   getAllusers,
};
