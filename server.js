const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require("./models");
const bodyParser = require("body-parser");
//env variables
require("dotenv").config();
//set root diectory
global.__basedir = __dirname;

//middleware
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
//app.use(express.static(path.join(__dirname, "client", "build")));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//startup
require("./startup/routes")(app);

//Right before your app.listen(), add this:
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

//server

db.sequelize.sync().then(function () {
  const PORT = process.env.PORT || 3922;
  app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
});
