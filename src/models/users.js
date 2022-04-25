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
      const { password, phone_number, pict, display_name, first_name, last_name, birthday_date, address, gender } = body;
      const sqlQuery = 'UPDATE users SET password=$1, phone_number=$2, pict=$3, display_name=$4, first_name=$5, last_name=$6, birthday_date=$7, address=$8, gender=$9 WHERE id=$10 RETURNING *';
      db.query(sqlQuery, [password, phone_number, pict, display_name, first_name, last_name, birthday_date, address, gender, id])
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
