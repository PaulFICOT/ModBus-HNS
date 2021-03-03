// 'use strict';
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
async function makeRequest(callback) {
  const socket = new net.Socket();
  const client = new modbus.client.TCP(socket);
  
  return new Promise((resolve,reject) => {
    
    socket.connect(options, () => {resolve(callback(socket,client))});
    socket.on('error', (err) => reject(err))
  });
  
}

// Read a single holding register
async function readRegister(address) {
  
  return makeRequest((socket,client) => {
    return client.readHoldingRegisters(address, 1)
    .then(function (resp) {
      const value = resp.response._body.valuesAsArray[0];
      socket.end()
      return  value;})
    });
    
  } 
  
  
  // Read a single bit
  async function readBits (address, bitIndex) {
    
    return makeRequest((socket,client) => {
      return client.readCoils(address, 1)
      .then(function (resp) {
        const value = resp.response._body.valuesAsArray[0];
        socket.end()
        return  value;})
      });
    }
    
    // Write a single register 
    async function writeRegister (address, value) {
      
      return makeRequest((socket,client) => {
        return client.writeSingleRegister(address, value)
        .then(function (resp) {
          socket.end()
          return  value;})
          .catch(function () {
            console.error(arguments);
            socket.end();
          });
        });
        
      }
      
      // Write a single bit
      async function writeBit (address, value) {
        return makeRequest((socket,client) => {
          return client.writeSingleCoil(address, value)
          .then(function (resp) {
            socket.end()
            return  value;})
            .catch(function () {
              console.error(arguments);
              socket.end();
            });
          });
          
          
        }
     
        exports.readRegister = readRegister;
        exports.readBits = readBits;
        exports.writeRegister = writeRegister;
        exports.writeBit = writeBit;
        