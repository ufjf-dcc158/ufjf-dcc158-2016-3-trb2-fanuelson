process.env.NODE_ENV = process.env.NODE_ENV||"devel";

console.log(process.env.NODE_ENV);

var conf = require('./config/config.js');

console.log(conf.db);
var mongoose = require('./config/mongoose');
var express = require("./config/express");
var db = mongoose();
var app = express();
app.listen(process.env.PORT);
console.log("Executando na porta http://localhost:3000...");

module.exports = app;
