const purchases = require("../routes/purchases");
const nodeMailer = require("../routes/nodeMailer");
const messages = require("../routes/messages");
const carts = require("../routes/carts");
const products = require("../routes/products");
const users = require("../routes/users");
const auth = require("../routes/auth");
const categories = require("../routes/categories");

module.exports = function (app) {
  app.use("/api/purchases", purchases);
  app.use("/api/nodeMailer", nodeMailer);
  app.use("/api/messages", messages);
  app.use("/api/carts", carts);
  app.use("/api/products", products);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/categories", categories);
};
