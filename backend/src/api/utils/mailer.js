const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: config.mail.mail_user,
    pass: config.mail.mail_pass
  },
});

async function send(message) {
  await transporter.sendMail(message);
}

module.exports = { send };
