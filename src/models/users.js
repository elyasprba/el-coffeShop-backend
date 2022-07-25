const db = require('../config/db');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../helpers/errorHandler');

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

const getAllusers = (query) => {
   return new Promise((resolve, reject) => {
      const { page = 1, limit = 2 } = query;
      const offset = (Number(page) - 1) * Number(limit);
      db.query('SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2', [Number(limit), offset])
         .then((result) => {
            const response = {
               data: result.rows,
            };
            db.query('SELECT COUNT(*) AS count_users FROM users')
               .then((result) => {
                  response.totalData = Number(result.rows[0]['count_users']);
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

const findUsers = (id) => {
   return new Promise((resolve, reject) => {
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

const updateUsers = (id, file, body) => {
   return new Promise((resolve, reject) => {
      const { email, password, phone_number, display_name, first_name, last_name, address, gender, birthday_date } = body;
      const updated_at = new Date(Date.now());
      let pict = null;
      if (file !== null) {
         pict = file.path;
      }
      const sqlQuery =
         'UPDATE users SET email = coalesce($1, email), password = coalesce($2, password), phone_number = coalesce($3, phone_number), display_name = coalesce($4, display_name), first_name = coalesce($5, first_name), last_name = coalesce($6, last_name), address = coalesce($7, address), gender = coalesce($8, gender), birthday_date = coalesce($9, birthday_date), pict = coalesce($10, pict), updated_at = $11 WHERE id = $12 returning email, phone_number, pict, display_name, first_name, last_name, address, gender, birthday_date';
      db.query(sqlQuery, [email, password, phone_number, display_name, first_name, last_name, address, gender, birthday_date, pict, updated_at, id])
         .then((result) => {
            const response = {
               data: result.rows[0],
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

const updateUserPassword = async (newPassword, email) => {
   try {
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      const resetPass = await db.query('UPDATE users set password = $1 WHERE email = $2 RETURNING *', [hashedNewPassword, email]);
      if (!resetPass.rowCount) throw new ErrorHandler({ status: 404, message: 'Email Not Found' });
      return {
         message: 'Your Password successfully recovered',
      };
   } catch (error) {
      const { status, message } = error;
      throw new ErrorHandler({ status: status ? status : 500, message });
   }
};

const updateNewPassword = async (id, body) => {
   try {
      const { password } = body;
      const updated_at = new Date(Date.now());
      let hashedNewPassword = null;
      if (password) {
         hashedNewPassword = await bcrypt.hash(password, 10);
      }
      const sqlQuery = await db.query('UPDATE users SET password = coalesce($1, password), updated_at = $2 WHERE id = $3', [hashedNewPassword, updated_at, id]);
      if (!sqlQuery.rowCount) throw new ErrorHandler({ status: 404, message: 'Id Not Found' });
      return {
         message: 'Update successful',
      };
   } catch (error) {
      const { status, message } = error;
      throw new ErrorHandler({ status: status ? status : 500, message });
   }
};

module.exports = {
   createUsers,
   getAllusers,
   findUsers,
   updateUsers,
   deleteUsers,
   updateUserPassword,
   updateNewPassword,
};
