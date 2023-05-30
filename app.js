var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const routerBids = require("./app/api/bids/router");
const routerProcurement = require("./app/api/procurement/procurement.router");
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

module.exports = app;
