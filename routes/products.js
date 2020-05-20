const db = require('../models');
const express = require('express');
const router = express.Router();
const ash = require('express-async-handler');
//post a product
router.post('/', ash(async (req, res) => {
  
    const product = await db.Product.create(req.body);

    res.json(product);
}));
//get all products
router.get('/', ash(async(req,res) =>{
    const products = await db.Product.findAll({
        include: [db.Purchase]
    });

    if(!products) res.status(404).send('Error finding all products');

    res.json(products);

}));
//get product byPK id (productId)
router.get('/byPK/:id', ash(async(req,res) =>{
    const product = await db.Product.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Purchase] //see how many times product has been purchased
        //product is parent of purchase
    });

    if(!product) res.status(404).send('Error finding all product by PK');

    res.json(product);

}));
//updating existing product byPK id
//use this when user checksout to subtract from db
router.put('/byPK/:id', ash(async(req,res) =>{
    const product = await db.Product.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.json(product);
}));

//delete existing product byPK id
router.delete('/byPK/:id', ash(async(req,res) =>{
    const product = await db.Product.destroy({
        where: {
            id: req.params.id
        }
    });

    res.json(product);
}));

module.exports = router;