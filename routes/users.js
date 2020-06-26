const db = require("../models");
const express = require("express");
const router = express.Router();
const ash = require("express-async-handler");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
//registering user (hash pw in model hook)
router.post(
  "/",
  ash(async (req, res) => {
    const { email } = req.body;
    req.body.isAdmin = 0;
    let user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (user) return res.status(400).send("User already registered.");
    const newUser = await db.User.create(req.body);
    res.json(newUser);
  })
);

router.get(
  "/:id",
  auth,
  ash(async (req, res) => {
    const users = await db.User.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Purchase, db.Cart],
    });

    if (!users) return res.status(404).send("Error Finding Users");

    res.json(users);
  })
);

router.get(
  "/",
  [auth, admin],
  ash(async (req, res) => {
    const users = await db.User.findAll({
      include: [db.Purchase, db.Cart],
    });

    if (!users) return res.status(404).send("Error Finding Users");

    res.json(users);
  })
);

router.put(
  "/:id",
  [auth],
  ash(async (req, res) => {
    const user = await db.User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(user);
  })
);

module.exports = router;
