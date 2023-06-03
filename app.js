var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const routerBids = require("./app/api/bids/router");
const routerProcurement = require("./app/api/procurement/procurement.router");
const routerVendor = require("./app/api/vendor/vendor.router");
const routerGovernment = require("./app/api/Government/government.router");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send({
    msg: "Wellcome to API Proffera",
  });
});

app.use("/api", routerProcurement);
app.use("/api", routerBids);
app.use("/api", routerVendor);
app.use("/api", routerGovernment);

module.exports = app;
