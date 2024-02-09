"use strict";
require("dotenv").config();

/* Express */
var express = require("express");
var app = express();

/* Utilities */
var Logger = require("./util/Logger");

/* Loaders & Router */
var Loader = require("./loaders");
var Router = require("./routes");

/* Initialize all Loaders & Routes */
/* Listen on success */
Promise.all([Loader.init(app), Router.init(app)])
  .then((result) => {
    let port = process.env.PORT || 8080;
    let appName = process.env.APP_NAME || "[App]";
    Logger.log("info", "Configurations loaded", Object.assign({}, ...result));
    app.listen(port, () => {
      Logger.log("info", "[" + appName + "] Now up and running", { port: port });
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
