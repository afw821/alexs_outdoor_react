const purchases = require("../routes/purchases");
const nodeMailer = require("../routes/nodeMailer");
const carts = require("../routes/carts");
const users = require("../routes/users");
const auth = require("../routes/auth");


module.exports = function (app) {
  app.use("/api/projects", purchases);
  app.use("/api/nodeMailer", nodeMailer);
  app.use("/api/carts", carts);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};