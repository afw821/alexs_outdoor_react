const db = require('../models');
const express = require('express');
const router = express.Router();
const ash = require('express-async-handler');
const auth = require("../middleware/auth");
//registering user (hash pw in model hook)
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

router.get('/', ash(async (req,res) =>{
    const users = await db.User.findAll({
        include: [db.Purchase]
    });

    if(!users) return res.status(404).send('Error Finding Users');

    res.json(users);
}));

module.exports = router;