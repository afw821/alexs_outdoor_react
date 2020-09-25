const nodemailer = require("nodemailer");
const renderContactHtml = require("./renderContactHtml");
require("dotenv").config();

function sendEmailContact(fromEmail, message, name) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: fromEmail,
    to: "afw821@gmail.com",
    subject: `From:${name}`,
    html: renderContactHtml(fromEmail, message, name),
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

module.exports = sendEmailContact;
