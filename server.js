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
//whtlist origins
const whitelist = [
  "http://localhost:3000",
  "https://alexsoutdoorstore.herokuapp.com/",
];
//middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        var message = `The CORS policy for this origin doesn't 
                  allow access from the particular origin.`;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build"))); //for heroku deployment
}
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 50000,
  })
);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//startup
require("./startup/routes")(app);

//Right before your app.listen(), add this: for heroku deployment
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//server

db.sequelize.sync().then(function () {
  const PORT = process.env.PORT || 3922;
  app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
});
