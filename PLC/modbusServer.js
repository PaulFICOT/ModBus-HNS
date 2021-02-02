'use strict'

const net = require('net')
const modbus = require('jsmodbus')
const netServer = new net.Server()
const holding = Buffer.alloc(10000)
const server = new modbus.server.TCP(netServer, {
  holding: holding
})



server.on('connection', function (client) {
  console.log('New Connection')
})


server.on('WriteSingleRegister', function (value, address) {
  //TODO: Update the DB with server.holding.readUInt16BE(address)
  
})

server.on('writeMultipleCoils', function (value) {
  //Update DB
  console.log('Write multiple coils - Existing: ', value)
})


server.on('writeMultipleRegisters', function (value) {
  //Update DB

  // webServer.updatewordValue(address,value);
})
const modbusPort = process.argv[2] || 8502;
console.log("Modbus server started on port " + modbusPort+"...")
netServer.listen(modbusPort)

exports.server = server;