require('dotenv').config();

const express = require('express');
const mainRouter = require('./src/routes/index');
const db = require('./src/config/db');
const cors = require('cors');

const server = express();
const PORT = 8080;

db.connect()
   .then(() => {
      console.log('Database Connected');
      // middleware global
      // handler untuk body form urlencoded
      server.use(express.urlencoded({ extended: false }));
      server.use(express.json());
      // cors
      const corsOptions = {
         origin: '*',
         methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
         allowedHeaders: ['Content-Type', 'Authorization'],
      };
      server.use(cors(corsOptions));

      server.use(express.static('public'));

      // mainRouter
      server.use(mainRouter);

      server.listen(PORT, () => {
         console.log('App listening on port 8080');
      });
   })
   .catch((err) => {
      console.log(err);
   });
