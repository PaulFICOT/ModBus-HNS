//Imports

const express = require('express');
const app = express();
const bodyParser = require("body-parser");

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


// Home page get
app.get('/', function(req, res) {

  res.render('pages/index', {
    plc_name: plc_name,
    valeurs: variables
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
  variables.push(variable);
  res.redirect("/");
});


// post /update route
app.post("/update", function(req, res) {
  //TODO: make update post function
  console.log(req.body);

  res.redirect("/");
});

// post /update route
app.post("/delete", function(req, res) {
  //TODO: make update post function
  console.log("delete");

  res.redirect("/");
});


app.listen(webServPort);
console.log("Server web port " + webServPort + "...");
