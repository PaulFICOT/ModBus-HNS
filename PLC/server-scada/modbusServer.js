'use strict'

const net = require('net')
const modbus = require('jsmodbus')
const netServer = new net.Server()
const holding = Buffer.alloc(10000)
const server = new modbus.server.TCP(netServer, {
  holding: holding
})


console.log(process.argv[2])
netServer.listen(process.argv[2] || 8502)

exports.server = server;