//Imports
const modbusServer = require(__dirname+"/modbusClient.js");


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
},{
  name: 'Ma variable1',
  comment: "Projet",
  address: "1",
  value: true
},{
  name: 'Ma variable1',
  comment: "Projet",
  address: "2",
  value: true
},{
  name: 'Ma variable1',
  comment: "Projet",
  address: "3",
  value: true
},
];


// Home page get
app.get('/', function(req, res) {

  res.redirect("/words");
});


app.get('/words', function(req, res) {

  Words.forEach(function(variable){
    //TODO: make the formula for each address types
  })
  res.render('pages/index', {
    plc_name: plc_name +" Words",
    datas: Words
  });
});


app.get('/bits', function(req, res) {

  for(i=0; i<100; i++){console.log(modbusServer.server.coils.readUInt8(i));}
  Bits.forEach(function(variable){
    //TODO: make the formula for each address types
  })

  res.render('pages/index', {
    plc_name: plc_name +" Bits",
    datas: Bits
  });
});

// post /add route
app.post("/add", function(req, res) {
  const variable = {
    name: req.body.name,
    comment: req.body.comment,
    address: req.body.address,
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

