require('dotenv').config();

const express = require('express');
const mainRouter = require('./src/routes/index');
const db = require('./src/config/db');
const cors = require('cors');
const logger = require('morgan');
const cloudConfig = require('./src/config/cloudinary');

const server = express();
const PORT = process.env.PORT || 8080;

db.connect()
   .then(() => {
      console.log('Database Connected');
      // middleware global
      // handler untuk body form urlencoded
      server.use(express.urlencoded({ extended: false }));
      server.use(express.json());
      // cors
      const corsOptions = {
         origin: ['*', 'http://localhost:3000', 'https://el-coffee-shop.netlify.app'],
         methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
         allowedHeaders: ['Content-Type', 'Authorization'],
      };
      server.use(cors(corsOptions));
      server.use(cloudConfig);
      server.use(express.static('public'));
      server.use(logger(':method :url :status :res[content-length] - :response-time ms'));

      // mainRouter
      server.use(mainRouter);

      server.listen(PORT, () => {
         console.log('App listening on port 8080');
      });
   })
   .catch((err) => {
      console.log(err);
   });
