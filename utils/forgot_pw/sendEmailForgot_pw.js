const nodemailer = require("nodemailer");
const forgot_pw = require("../forgot_pw/forgot_pw");
require("dotenv").config();

function sendEmailForgot_pw(user) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const token = forgot_pw.usePasswordHashToMakeToken(user);
  const url = forgot_pw.getPasswordResetURL(user, token);
  const mailOptions = forgot_pw.resetPasswordTemplate(user, url);

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

module.exports = sendEmailForgot_pw;
