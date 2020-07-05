const db = require("../models");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const ash = require("express-async-handler");
const fs = require("fs");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
//post a product
router.post(
  "/",
  [auth, admin],
  upload.single("file"),
  ash(async (req, res) => {
    //const { name, inStock } = req.body;
    if (!req.file) return res.status(400).send(`You must select a file.`);
    const { name, inStock, CategoryId, price, description } = req.body;

    const product = await db.Product.create({
      name: name,
      price: price,
      description: description,
      inStock: inStock,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
      dataName: req.file.filename,
      imgSrc: null,
      CategoryId: CategoryId,
    });
    //write the file to a temp folder
    fs.writeFileSync(
      __basedir + "/resources/static/assets/tmp/" + product.dataName,
      product.data
    );
    res.json(product);
  })
);
//get all products
router.get(
  "/",
  ash(async (req, res) => {
    let products = await db.Product.findAll({
      include: [db.Purchase],
    });

    if (!products) res.status(404).send("Error finding all products");

    res.json(products);
  })
);
//get product byPK id (productId)
router.get(
  "/byPK/:id",
  ash(async (req, res) => {
    const product = await db.Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Purchase], //see how many times product has been purchased
      //product is parent of purchase
    });

    if (!product) res.status(404).send("Error finding all product by PK");

    res.json(product);
  })
);
//updating existing product byPK id
//use this when admin need to update product
router.put(
  "/byPK/:id",
  ash(async (req, res) => {
    const product = await db.Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json(product);
  })
);
//call this when a user purchases to update quantity
router.put(
  "/byPK/purchase/:id",
  ash(async (req, res) => {
    let product = await db.Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    let userQuant = req.body.userQuant;

    const updatedStock = (product.inStock -= userQuant);

    const newProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      inStock: updatedStock,
      data: product.data,
      dataName: product.dataName,
      imgSrc: product.imgSrc,
      CategoryId: product.CategoryId,
    };
    const result = await db.Product.update(newProduct, {
      where: {
        id: req.params.id,
      },
    });

    res.json(result);
  })
);

//delete existing product byPK id
router.delete(
  "/byPK/:id",
  [auth, admin],
  ash(async (req, res) => {
    const product = await db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json(product);
  })
);

module.exports = router;
