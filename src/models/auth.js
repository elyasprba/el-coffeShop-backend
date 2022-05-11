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

module.exports = {
   register,
};
