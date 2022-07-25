const nodemailer = require('nodemailer');

const sendPasswordConfirmation = async (email, confirmCode) => {
   try {
      const transport = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
         },
      });
      let html = `<h4>el-CoffeeShop Forgot Password Confirmation</h4>
      <h5>Hi, ${email}</h5>
      <p>Here is your account details:</p>
      <ul>
      <li>Email: <h6>${email}</h6></li>
      </ul>
      <p>
      Your reset password confirmation code: <br> <h3>${confirmCode}</h3> <br> Input this code when reset your password!
      </p`;

      let mailOptions = {
         from: process.env.MAIL_USERNAME,
         to: email,
         subject: 'Forgot Password',
         html,
      };

      await transport.sendMail(mailOptions);
   } catch (error) {
      console.log(error.message);
   }
};

module.exports = {
   sendPasswordConfirmation,
};
