const db = require('../models');
const express = require('express');
const router = express.Router();
const ash = require('express-async-handler');

//add item to purchase
router.post('/', ash(async (req,res) =>{

    const purchase = await db.Purchase.create(req.body);
    
    if(!purchase) return res.status(400).send('Error creating purchase');

    res.json(purchase);
}));

//get all purchases Left Join Product and User
router.get('/', ash(async (req,res) =>{
    const purchases = await db.Purchase.findAll({
        include: [db.Product, db.User]
    });
    if(!purchases) return res.status(404).send("Error Finding purchases");

    res.json(purchases);

}));

//get purchases by purchase PK (purchaseId)
router.get('/byPK/:purchaseId', ash(async(req,res) =>{
    const purchase = await db.Purchase.findOne({
        where: {
            id: req.params.purchaseId
        },
        include: [db.User, db.Product]
    });

    if(!purchase) return res.status(404).send('Unable to find this purchase');

    res.json(purchase);
}));

//get purchase by FK (userId)
router.get('/byUserId/:userId', ash(async(req,res) =>{
    const purchase = await db.Purchase.findAll({
        where: {
            userId: req.params.userId
        },
        include: [db.User, db.Product]
    });

    if(!purchase) return res.status(404).send("Unable to Locate purchase");

    res.json(purchase);

}));

//delete purchase by PK (purchaseId) //this called when user clicks to remove one item
router.delete('/byPK/:purchaseId', ash(async(req,res) =>{
    const purchase = await db.Purchase.destroy({
        where: {
            id: req.params.purchaseId
        }
    });

    res.json(purchase);
}));

//delete purchase by FK (userId) //this route called when user clicks empty purchase
router.delete('/byUserId/:userId', ash(async(req,res) =>{
    const purchase = await db.Purchase.destroy({
        where: {
            userId: req.params.userId
        }
    });

    res.json(purchase);
}));

module.exports = router;