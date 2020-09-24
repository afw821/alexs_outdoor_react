const nodemailer = require("nodemailer");
require("dotenv").config();

function sendMsgPurchase(name, toEmail, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  console.log("---------------HTML-------------", html);
  var mailOptions = {
    from: "afw821@gmail.com",
    to: toEmail,
    subject: `${name}, here is your purchase summary`,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("-------------transporter error-----------------", error);
      return false;
    } else {
      console.log(
        "-----------------Email sent:--------------------- " + info.response
      );
      return true;
    }
  });
  return true;
}

module.exports = sendMsgPurchase;
