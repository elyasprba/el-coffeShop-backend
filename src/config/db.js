const psql = require('pg');
const { Pool } = psql;

const db = new Pool({
   // user: process.env.DB_USER,
   // host: process.env.DB_HOST,
   // database: process.env.DB_DATABASE,
   // password: process.env.DB_PASSWORD,
   // port: process.env.DB_PORT,

   connectionString: process.env.DATABASE_URL,
   ssl: {
      rejectUnauthorized: false,
   },
});

module.exports = db;
