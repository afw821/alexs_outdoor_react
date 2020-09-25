const nodemailer = require("nodemailer");
require("dotenv").config();

function sendEmailPurchase(name, toEmail, html, userId) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const maillist = [toEmail, "afw821@gmail.com"];

  maillist.forEach((to, i, arr) => {
    var mailOptions = {
      from: "afw821@gmail.com",
      to: to,
      subject:
        to === "afw821@gmail.com"
          ? `${name + " " + userId} purchase`
          : `${name} here is your purchase information`,
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
  });

  return true;
}

module.exports = sendEmailPurchase;
