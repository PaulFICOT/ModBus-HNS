//Imports
const modbusServer = require(__dirname+"/modbusServer.js");


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

var Words = [{
  name: 'Ma variable1',
  comment: "Projet",
  address: "0",
  value: 18
}];

var Bits = [{
  name: 'Ma variable1',
  comment: "Projet",
  address: "0",
  value: true
}];


// Home page get
app.get('/', function(req, res) {

  Words.forEach(function(variable){
    //TODO: make the formula for each address types
      variable.value = modbusServer.server.holding.readUInt16BE(parseInt(variable.address)*2+2)
  })

  res.render('pages/index', {
    plc_name: plc_name,
    datas: Words
  });
});

// post /add route
app.post("/add", function(req, res) {
  const variable = {
    name: req.body.name,
    comment: req.body.comment,
    address: req.body.address,
    value: req.body.value
  };
  Words.push(variable);
  res.redirect("/");
});


// post /update route
app.post("/update", function(req, res) {
  //TODO: make update post function
  console.log(req.body);
  const newVar = {
    name: req.body.newName,
    comment: req.body.newComment,
    address: req.body.newAddress,
    value: req.body.newValue
  };

  Words.forEach(function(variable, index){

    if(variable.name == req.body.variableName){
      Words[index] = newVar;
    }
  });

  res.redirect("/");
});

// post /update route
app.post("/delete", function(req, res) {
  const varToDelete = req.body.variableName;
  _.remove(Words, variable => variable.name == varToDelete);

  res.redirect("/");
});


app.listen(webServPort);
console.log("Server web started on port:  " + webServPort + "...");



exports.app= app;
exports.webServPort = webServPort;
exports.plc_name = plc_name;
exports.Words = Words;

exports.updatewordValue = function(address, value){
  Words.forEach(function(variable){
    if(variable.address == address){
      variable.value = value;
    }
  });
};