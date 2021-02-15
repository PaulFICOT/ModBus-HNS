'use strict';
// Conf vars
const config = require('./config');
const path = require('path');
const modbus = require('jsmodbus');
const net = require('net');

const webServer = require(path.join(__dirname, '/server.js'));

const options = {
  host: config.plc.ip,
  port: config.plc.port
};


// Make a modbus request
function makeRequest (callback) {
  const socket = new net.Socket();
  const client = new modbus.client.TCP(socket);
  callback(socket, client);

  socket.on('error', console.error);
  socket.connect(options);
}

// Read a single holding register
function readRegister (address, wordIndex) {
  makeRequest(function (socket, client) {
    socket.on('connect', function () {
      client
        .readHoldingRegisters(address, 1)
        .then(function (resp) {
          const value = resp.response._body.valuesAsArray[0];
          webServer.Words[wordIndex].value = value;
          socket.end();
        })
        .catch(function () {
          console.error(
            require('util').inspect(arguments, {
              depth: null
            })
          );
          socket.end();
        });
    });
  });
}

// Read a single bit
function readBits (address, bitIndex) {
  makeRequest(function (socket, client) {
    socket.on('connect', function () {
      client
        .readCoils(address, 1)
        .then(function (resp) {
          const value = resp.response._body.valuesAsArray[0];
          webServer.Bits[bitIndex].value = value;
          socket.end();
        })
        .catch(function () {
          console.error(
            require('util').inspect(arguments, {
              depth: null
            })
          );
          socket.end();
        });
    });
  });
}

// Write a single register 
function writeRegister (address, value) {
  makeRequest(function (socket, client) {
    socket.on('connect', function () {
      client.writeSingleRegister(address, value)
        .then(function (resp) {
          socket.end();
        }).catch(function () {
          console.error(arguments);
          socket.end();
        });
    });
  });
}

// Write a single bit
function writeBit (address, value) {
  makeRequest(function (socket, client) {
    socket.on('connect', function () {
      client.writeSingleCoil(address, value)
        .then(function (resp) {
          socket.end();
        }).catch(function () {
          console.error(arguments);
          socket.end();
        });
    });
  });
}


// Update the data periodically
setInterval(function () {
  webServer.Words.forEach((word, index) => {
    readRegister(word.address, index);
  });

  webServer.Bits.forEach((bit, index) => {
    readBits(bit.address, index);
  });
}, config.plc.updateTime);

exports.writeRegister = writeRegister;
exports.writeBit = writeBit;
