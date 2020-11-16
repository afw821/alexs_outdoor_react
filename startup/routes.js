const purchases = require("../routes/purchases");
const messages = require("../routes/messages");
const carts = require("../routes/carts");
const products = require("../routes/products");
const users = require("../routes/users");
const auth = require("../routes/auth");
const categories = require("../routes/categories");
const payments = require("../routes/stripe");
module.exports = function (app) {
  app.use("/api/purchases", purchases);
  app.use("/api/messages", messages);
  app.use("/api/carts", carts);
  app.use("/api/products", products);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/categories", categories);
  app.use("/api/stripe/charge", payments);
};
