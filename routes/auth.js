const Joi = require('joi');
const { User } = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const ash = require('express-async-handler');

router.post('/', ash(async (req, res) => {
    const { error } = validateUser(req.body);
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid Email and / or password');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email and / or password');
    const token = generateAuthToken();
    res.header('x-auth-token', token).send(token);
}));

function generateAuthToken(user){
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin, name: user.name, email: user.email }, 'jwtPrivateKey');

    return token;
}

function validateUser(user) {

    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}
module.exports = router;