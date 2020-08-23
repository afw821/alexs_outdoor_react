const nodemailer = require("nodemailer");
require("dotenv").config();

function sendMsgPurchase(fromEmail, message, name, toEmail, purchasesObj) {
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.EMAIL_ADDRESS,
  //       pass: process.env.EMAIL_PASSWORD,
  //     },
  //   });
  //     var mailOptions = {
  //       from: fromEmail,
  //       to: "afw821@gmail.com",
  //       subject: `From:${name}`,
  //       html: `<h1>Message: ${message} Email: ${fromEmail}</h1>`,
  //     };

  //   transporter.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log("-------------transporter error-----------------", error);
  //       return false;
  //     } else {
  //       console.log(
  //         "-----------------Email sent:--------------------- " + info.response
  //       );
  //     }
  //   });

  console.log(purchasesObj);

  return true;
}

module.exports = sendMsgPurchase;
