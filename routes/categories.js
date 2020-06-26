const db = require("../models");
const express = require("express");
const router = express.Router();
const ash = require("express-async-handler");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
//post a product
router.post(
  "/",
  [auth, admin],
  ash(async (req, res) => {
    const category = await db.Category.create(req.body);

    res.json(category);
  })
);

router.get(
  "/",
  ash(async (req, res) => {
    const categories = await db.Category.findAll({
      include: [db.Product],
    });

    if (!categories) res.status(404).send("Error finding all categories");

    res.json(categories);
  })
);

//get category byPK id (categoryId)
router.get(
  "/byPK/:id",
  ash(async (req, res) => {
    const category = await db.Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Product], //see how many times product has been purchased
      //product is parent of purchase
    });

    if (!category) res.status(404).send("Error finding category by PK");

    res.json(category);
  })
);

module.exports = router;
