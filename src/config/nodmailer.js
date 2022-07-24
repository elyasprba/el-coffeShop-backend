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
      let html = `<h2>el-CoffeeShop Forgot Password Confirmation</h2>
      <h3>Hi, ${email}</h3>
      <h3>Here is your account details:</h3>
      <ul>
      <li>Email: <h3>${email}</h3></li>
    </ul>
    YOUR RESET PASSWORD CONFIRMATION CODE: <h1>${confirmCode}</h1> <br>
    INPUT THIS CODE WHEN RESET YOUR PASSWORD !
    <h2> <a href=${process.env.CLIENT_URL}/auth/forgot/${email}> Click here to reset your password</a></h2>
      </div>`;

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
