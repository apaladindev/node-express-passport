const nodemailer = require('nodemailer');
const { config } = require('./config/config');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  // tls: {
  //   ciphers: "SSLv3",
  //   rejectUnauthorized: false,
  // },
  // requireTLS: true,
  auth: {
    user: config.smtpAccount,
    pass: config.smtpPassword
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: config.smtpAccount, // sender address
    to: config.smtpAccount, // list of receivers
    subject: 'New mail test', // Subject line
    text: 'Hello Alee', // plain text body
    html: '<b>Hi dude</b>', // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendMail();
