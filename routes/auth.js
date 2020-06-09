const db = require("../models");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ash = require("express-async-handler");

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      Purchases: user.Purchases,
      Carts: user.Carts
    },
    process.env.JWT_PRIVATEKEY
  );

  return token;
}

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
//this is for refresh issue
router.post(
  "/generateToken/",
  ash(async (req, res) => {
    console.log("-------req.body-----", req.body);
    const token = await generateAuthToken(req.body);

    res.header("x-auth-token", token).send(token);
  })
);

module.exports = router;
