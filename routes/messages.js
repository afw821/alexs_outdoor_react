const ash = require("express-async-handler");
const express = require("express");
const router = express.Router();
const sendMessage = require("../utils/nodeMailer");
const sendMsgPurchase = require("../utils/nodeMailPurchase");
require("dotenv").config();
router.post(
  "/",
  ash(async (req, res) => {
    const { name, email, message } = req.body;
    const result = await sendMessage(email, message, name);
    if (!result)
      res.status(400).send({ sent: false, message: "Error Sending Message" });

    res.send({ sent: true, message: "Message sent successfully" });
  })
);

router.post(
  "/purchase",
  ash(async (req, res) => {
    const { name, email, message, toEmail, purchasesObj } = req.body;
    console.log("----------Name-------------", name);
    console.log("----------Email-------------", email);
    console.log("----------message-------------", message);
    console.log("----------Purchase Obj-------------", purchasesObj);
    const result = await sendMsgPurchase(
      email,
      message,
      name,
      toEmail,
      purchasesObj
    );
    if (!result)
      res.status(400).send({ sent: false, message: "Error Sending Message" });

    res.send({ sent: true, message: "Message sent successfully" });
  })
);

module.exports = router;
