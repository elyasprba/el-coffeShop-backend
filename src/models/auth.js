const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const register = (hashPassword, email, phone_number) => {
   return new Promise((resolve, reject) => {
      const sqlQuery = 'INSERT INTO users(id, email, password, phone_number, created_at) VALUES ($1, $2, $3, $4, $5)';
      const id = uuidv4();
      const timestemp = new Date(Date.now());
      db.query(sqlQuery, [id, email, hashPassword, phone_number, timestemp])
         .then(() => {
            resolve();
         })
         .catch((err) => {
            reject({
               status: 500,
               err,
            });
         });
   });
};

const getEmailUsers = (email) => {
   return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT email FROM users WHERE email = $1';
      db.query(sqlQuery, [email])
         .then((result) => {
            resolve(result);
         })
         .catch((err) => {
            reject(err);
         });
   });
};

const getPassByUserEmail = async (email) => {
   try {
      const sqlQuery = 'SELECT * FROM users WHERE email = $1';
      const result = await db.query(sqlQuery, [email]);
      if (result.rowCount === 0) {
         throw { status: 400, err: { msg: 'Email is not registered' } };
      }
      return result.rows[0];
   } catch (error) {
      const { status = 500, err } = error;
      throw { status, err };
   }
};

module.exports = {
   register,
   getEmailUsers,
   getPassByUserEmail,
};
