const db = require('../models');
const express = require('express');
const router = express.Router();
const ash = require('express-async-handler');

router.post('/', ash(async (req, res) => {
  
    const product = await db.Product.create(req.body);

    res.json(product);
}));

module.exports = router;