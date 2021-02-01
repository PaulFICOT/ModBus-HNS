//Imports

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");




// set the app
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({
  extended: true
}));


// Conf vars
const webServPort = 8080;
const plc_name = "PLC_0";

var variables = [{
  name: 'Ma variable1',
  comment: "Projet",
  address: "%MW0",
  value: 18
}];



exports.app= app;
exports.webServPort = webServPort;