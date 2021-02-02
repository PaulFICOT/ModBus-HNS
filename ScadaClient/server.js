// Conf vars
const webServPort = 8080;
const plcName = 'PLC_0';

// Imports
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
const { v1: uuidv1 } = require('uuid');

// variables
const Words = [];
const Bits = [];

for (let i = 0; i < 10; i++) {
  const word = {
    _uid: uuidv1(),
    name: 'Ma variable ' + i,
    comment: 'Commentaire ' + i,
    address: i
  };
  Words.push(word);

  const bit = {
    _uid: uuidv1(),
    name: 'Ma variable ' + i,
    comment: 'Commentaire ' + i,
    address: i
  };
  Bits.push(bit);
}
const modbusServer = require(path.join(__dirname, '/modbusClient.js'));

// set the app
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/static')));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Home page get
app.get('/', function (req, res) {
  res.redirect('/Words');
});

app.get('/Words', async function (req, res) {
  res.render('pages/index', {
    plc_name: plcName,
    dataType: 'Words',
    prefix: '%MW',
    datas: Words
  });
});

app.get('/Bits', function (req, res) {
  res.render('pages/index', {
    plc_name: plcName,
    dataType: 'Bits',
    prefix: '%M',
    datas: Bits
  });
});

// post /add route
app.post('/add/:dataType', function (req, res) {
  const dataType = req.params.dataType;
  const variable = {
    _uid: uuidv1(),
    name: req.body.name,
    comment: req.body.comment,
    address: req.body.address
  };
  if (dataType === 'Words') {
    Words.push(variable);
  } else {
    Bits.push(variable);
  }
  res.redirect('/' + dataType);
});

// post /update route
app.post('/update/:dataType', function (req, res) {
  const dataType = req.params.dataType;

  const newVar = {
    _uid: req.body._uid,
    name: req.body.newName,
    comment: req.body.newComment,
    address: req.body.newAddress,
    value: req.body.newValue
  };

  if (dataType === 'Words') {
    modbusServer.writeRegister(newVar.address, parseInt(newVar.value));
    Words.forEach(function (variable, index) {
      if (variable._uid === req.body._uid) {
        Words[index] = newVar;
      }
    });
  } else {
    modbusServer.writeBit(newVar.address, (newVar.value === '1'));
    Bits.forEach(function (variable, index) {
      if (variable._uid === req.body._uid) {
        Bits[index] = newVar;
      }
    });
  }

  res.redirect('/' + dataType);
});

// post /delete route
app.post('/delete/:dataType', function (req, res) {
  const dataType = req.params.dataType;
  const varToDelete = req.body._uid;

  if (req.params.dataType === 'Words') {
    _.remove(Words, (variable) => variable._uid === varToDelete);
  } else {
    _.remove(Bits, (variable) => variable._uid === varToDelete);
  }

  res.redirect('/' + dataType);
});

app.listen(webServPort);
console.log('Server web started on port:  ' + webServPort + '...');

exports.Words = Words;
exports.Bits = Bits;
