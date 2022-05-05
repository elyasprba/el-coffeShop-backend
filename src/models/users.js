const db = require('../config/db');

const createUsers = (body) => {
   return new Promise((resolve, reject) => {
      const { email, password, phone_number } = body;
      const sqlQuery = 'INSERT INTO users(email, password, phone_number) VALUES ($1, $2, $3) RETURNING id, email, phone_number, pict, display_name, first_name, last_name, birthday_date, address, gender';
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

const findUsers = (id) => {
   return new Promise((resolve, reject) => {
      // parameterized query
      const sqlQuery = 'select * from users where id = $1';
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
            reject({ status: 500, err });
         });
   });
};

const updateUsers = (params, body) => {
   return new Promise((resolve, reject) => {
      const { id } = params;
      const { email, password, phone_number, pict, display_name, first_name, last_name, address, gender } = body;
      const sqlQuery =
         "UPDATE users SET email = coalesce(nullif($1, ''), email ), password = coalesce(nullif($2, ''), password ), phone_number = coalesce(nullif($3, ''), phone_number ), pict = coalesce(nullif($4, ''), pict ), display_name = coalesce(nullif($5, ''), display_name ), first_name = coalesce(nullif($6, ''), first_name ), last_name = coalesce(nullif($7, ''), last_name ), address  = coalesce(nullif($8, ''), address  ), gender = coalesce(nullif($9, ''), gender ) WHERE id=$10 returning email, phone_number, pict, display_name, first_name, last_name, address, gender, id";
      db.query(sqlQuery, [email, password, phone_number, pict, display_name, first_name, last_name, address, gender, id])
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
   findUsers,
   updateUsers,
   deleteUsers,
};
