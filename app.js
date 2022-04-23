require('dotenv').config();

const express = require('express');

const mainRouter = require('./src/routes/index');

const db = require('./src/config/db');

const server = express();
const PORT = 8080;

db.connect()
   .then(() => {
      console.log('Database Connected');
      // pasang middleware global
      // handler untuk body form urlencoded
      server.use(express.urlencoded({ extended: false }));

      server.use(express.json());

      server.use(mainRouter);

      server.listen(PORT, () => {
         console.log('App listening on port 8080');
      });
   })
   .catch((err) => {
      console.log(err);
   });
