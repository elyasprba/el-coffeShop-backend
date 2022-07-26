const Router = require('express').Router();
const { messaging } = require('../config/firebase');
const notif = messaging();

Router.post('/', async (req, res) => {
   try {
      const { body } = req;
      const msg = {
         token: process.env.TOKEN_NOTIF,
         notification: {
            body: body.message,
            title: body.title,
         },
      };
      await notif.send(msg);
      return res.status(200).json({
         message: 'Notification Sent',
      });
   } catch (err) {
      return res.status(500).json({
         message: err.message,
         err,
      });
   }
});

module.exports = Router;
