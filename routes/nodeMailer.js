const nodemailer = require("nodemailer");
require("dotenv").config();

function sendEmail(email, message, name) {
  console.log("made it to send email function", email, message, name);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: "afw821@gmail.com",
    subject: `From:${name}`,
    html: `<h1>Message: ${message} Email: ${email}</h1>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("-------------transporter error-----------------", error);
      return false;
    } else {
      console.log("-----------------Email sent:--------------------- " + info.response);
      
    }
  });

  return true;
}

module.exports = sendEmail;
