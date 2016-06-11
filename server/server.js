// import express from "express";
// import logger from "morgan";
// import bodyParser from "body-parser";
// import router from "./router";
//
// const app = express();
// let port = process.env.PORT || 8080;
//
// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(__dirname + "/../client"));
// app.use('/', router);
//
// const server = app.listen(port, () => {
//   console.log('Express listening on port', port);
// });

var express = require("express");
var logger =  require("morgan");
var bodyParser = require("body-parser");
var router = require("./router");

var app = express();
var port = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/../client"));
app.use('/', router);

var server = app.listen(port, () => {
  console.log('Express listening on port', port);
});
