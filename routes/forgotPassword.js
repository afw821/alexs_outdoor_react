const db = require("../models");
const express = require("express");
const router = express.Router();
const ash = require("express-async-handler");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendForgot_pw_email = require("../utils/forgot_pw/sendEmailForgot_pw");
require("dotenv").config();

//send email with reset link
router.post(
  "/:email",
  ash(async (req, res) => {
    const { email } = req.params;

    let user = await db.User.findOne({
      where: {
        email: email,
      },
    });
    if (!user)
      return res.status(400).send("No user with theat email is registered");

    sendForgot_pw_email(user);

    res.json({ complete: true });
  })
);

//recieve new password from secure link and update db
router.put(
  "/:userId/:token",
  ash(async (req, res) => {
    const { userId, token } = req.params;
    const { password } = req.body;

    let userEntity = await db.User.findOne({
      where: {
        id: userId,
      },
    });
    if (!userEntity) return res.status(400).send("Unable to find user");
    //else update the user w/ req.body.password

    const secret = userEntity.password + "-" + userEntity.createdAt;
    const payload = jwt.decode(token, secret);
    if (payload.userId === userEntity.id) {
      const salt = await bcrypt.genSalt(10);
      const newHashPw = await bcrypt.hash(password, salt);

      const updatedUser = {
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        address: userEntity.address,
        address2: userEntity.address2,
        city: userEntity.city,
        state: userEntity.state,
        zipCode: userEntity.zipCode,
        email: userEntity.email,
        password: newHashPw,
        isAdmin: userEntity.isAdmin,
      };

      const result = await db.User.update(updatedUser, {
        where: {
          id: userId,
        },
      });

      res.json({ result, complete: true });
    } else {
      res
        .status(400)
        .json({ message: "Unable to decode JWT and change password" });
    }
  })
);
module.exports = router;
