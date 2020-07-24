const db = require("../models");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ash = require("express-async-handler");
const auth = require("../middleware/auth");

require("dotenv").config();
function generateAuthToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: !user.isAdmin ? false : true,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      Purchases: user.Purchases,
      Carts: user.Carts,
    },
    process.env.JWT_PRIVATEKEY
  );

  return token;
}
//post a login
router.post(
  "/",
  ash(async (req, res) => {
    const { email, password } = req.body;
    let user = await db.User.findOne({
      where: {
        email: email,
      },
      include: [db.Purchase, db.Cart],
    });
    if (!user) return res.status(400).send("Invalid Email and / or password");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid Email and / or password");

    const token = generateAuthToken(user);

    res.header("x-auth-token", token).send(token);
  })
);
//update password
router.put(
  "/updatePassword",
  auth,
  ash(async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    let user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user)
      return res.status(400).send(`Unable to locate user with email: ${email}`);

    const validPassword = await bcrypt.compare(oldPassword, user.password);

    if (!validPassword) return res.status(400).send("Old Password is invalid");
    // console.log("---------------USER before------------------", user);
    //hash new password
    const salt = await bcrypt.genSalt(10);
    const newHashPw = await bcrypt.hash(newPassword, salt);

    const updatedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      email: email,
      password: newHashPw,
      isAdmin: user.isAdmin,
    };

    const result = await db.User.update(updatedUser, {
      where: {
        email: email,
      },
    });

    res.json(result);
  })
);

//this is for refresh issue
router.post(
  "/generateToken/",
  ash(async (req, res) => {
    console.log("--------------REQ BODY", req.body);
    const token = await generateAuthToken(req.body);

    res.header("x-auth-token", token).send(token);
  })
);

module.exports = router;
