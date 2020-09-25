const ash = require("express-async-handler");
const express = require("express");
const router = express.Router();
const sendEmailContact = require("../utils/sendEmailContact");
const sendMsgPurchase = require("../utils/sendEmailPurchase");
const sendEmailRegister = require("../utils/sendEmailRegister");
require("dotenv").config();

router.post(
  "/contact",
  ash(async (req, res) => {
    const { email, name, message } = req.body;
    const result = await sendEmailContact(email, message, name);
    if (!result)
      res.status(400).send({ sent: false, message: "Error Sending Message" });

    res.send({ sent: true, message: "Message sent successfully" });
  })
);

router.post(
  "/register",
  ash(async (req, res) => {
    const { fromEmail, name } = req.body;
    const result = await sendEmailRegister(fromEmail, name);
    if (!result)
      res.status(400).send({ sent: false, message: "Error Sending Message" });

    res.send({ sent: true, message: "Message sent successfully" });
  })
);

router.post(
  "/purchase",
  ash(async (req, res) => {
    const { name, toEmail, html, userId } = req.body;
    const result = await sendMsgPurchase(name, toEmail, html, userId);

    if (!result)
      res.status(400).send({ sent: false, message: "Error Sending Message" });

    res.send({ sent: true, message: "Message sent successfully" });
  })
);

module.exports = router;
