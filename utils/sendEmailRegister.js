const nodemailer = require("nodemailer");
const renderRegisterHtml = require("../utils/renderRegisterHtml");
require("dotenv").config();

function sendEmailRegister(fromEmail, name) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "afw821@gmail.com",
    to: fromEmail,
    subject: `Thanks for signing up for Alex's Outdoors!`,
    html: renderRegisterHtml(fromEmail, name),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("-------------transporter error-----------------", error);
      return false;
    } else {
      console.log(
        "-----------------Email sent:--------------------- " + info.response
      );
    }
  });

  return true;
}

module.exports = sendEmailRegister;
