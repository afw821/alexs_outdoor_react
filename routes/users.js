const db = require('../models');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const ash = require('express-async-handler');
const auth = require("../middleware/auth");

router.post('/', ash(async (req, res) => {

    const { email } = req.body;

    let user = await db.User.findOne({
        where: {
            email: email
        }
    });

    if (user) return res.status(400).send('User already registered.');
  
    user = await db.User.create(req.body);

    res.json(user);
}));

module.exports = router;