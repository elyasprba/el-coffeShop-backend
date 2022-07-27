const admin = require('firebase-admin');
require('dotenv').config();

// admin.initializeApp();
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
