const db = require("../models");
const express = require("express");
const router = express.Router();
const ash = require("express-async-handler");

//add item to cart
router.post(
  "/",
  ash(async (req, res) => {
    let cart = await db.Cart.findOne({
      where: {
        ProductId: req.body.ProductId,
      },
    });
    if (cart) return res.status(400).send("Item already added to the cart");

    const cartitem = await db.Cart.create(req.body);

    if (!cartitem) return res.status(400).send("Error creating cart");

    res.json(cartitem);
  })
);

//get all carts Left Join Product and User
router.get(
  "/",
  ash(async (req, res) => {
    const carts = await db.Cart.findAll({
      include: [db.Product, db.User],
    });
    if (!carts) return res.status(404).send("Error Finding Carts");

    res.json(carts);
  })
);

//get carts by cart PK (cartId)
router.get(
  "/byPK/:cartId",
  ash(async (req, res) => {
    const cart = await db.Cart.findOne({
      where: {
        id: req.params.cartId,
      },
      include: [db.User, db.Product],
    });

    if (!cart) return res.status(404).send("Unable to find this cart");

    res.json(cart);
  })
);

//get cart by FK (userId)
router.get(
  "/byUserId/:userId",
  ash(async (req, res) => {
    const cart = await db.Cart.findAll({
      where: {
        userId: req.params.userId,
      },
      include: [db.User, db.Product],
    });

    if (!cart) return res.status(404).send("Unable to Locate cart");

    cart.forEach((item) => (item.Product.data = null)); // we don't want to get large buffer array back on the client

    res.json(cart);
  })
);
//find and update by Foreign key UserId
router.put(
  "/byUserId/:userId",
  ash(async (req, res) => {
    const cart = await db.Cart.update(req.body, {
      where: {
        UserId: req.params.userId,
      },
    });
    if (!cart) return res.status(404).send("Unable to locate this cart item");
    res.json(cart);
  })
);
//update by PK Id
router.put(
  "/byPKId/:cartId",
  ash(async (req, res) => {
    const cart = await db.Cart.update(req.body, {
      where: {
        id: req.params.cartId,
      },
    });
    if (!cart) return res.status(404).send("Unable to locate this cart item");
    res.json(cart);
  })
);

//delete cart by PK (cartId) //this called when user clicks to remove one item
router.delete(
  "/byPK/:cartId",
  ash(async (req, res) => {
    const cart = await db.Cart.destroy({
      where: {
        id: req.params.cartId,
      },
    });

    if (!cart) return res.status(404).send("Unable to delete the cart");

    res.json(cart);
  })
);

//delete cart by FK (userId) //this route called when user clicks empty cart
router.delete(
  "/byUserId/:userId",
  ash(async (req, res) => {
    const cart = await db.Cart.destroy({
      where: {
        userId: req.params.userId,
      },
    });

    res.json(cart);
  })
);

module.exports = router;
