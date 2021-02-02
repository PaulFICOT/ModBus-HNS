'use strict';
// Imports
const net = require('net');
const modbus = require('jsmodbus');

// Init
const netServer = new net.Server();
const server = new modbus.server.TCP(netServer);

// Log connections to server
server.on('connection', function (client) {
  console.log('New Connection');
});

// Listener to log request or do specific actions when a request is detected
// server.on('WriteSingleRegister', function (value, address) {})
// server.on('writeMultipleCoils', function (value) {})
// server.on('writeMultipleRegisters', function (value) {})

// Port define in parameter or default is 8502
const modbusPort = process.argv[2] || 8502;
console.log('Modbus server started on port ' + modbusPort + '...');
netServer.listen(modbusPort);
