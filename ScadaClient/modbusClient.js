'use strict'

const modbus = require('jsmodbus')
const net = require('net')
const socket = new net.Socket()
const options = {
  'host': '127.0.0.1',
  'port': '8502'
}
const client = new modbus.client.TCP(socket)


socket.on('connect', function () {
  client.readCoils(2, 1)
    .then(function (resp) {
      console.log(resp.response._body._valuesAsArray[0])
      socket.end()
    }).catch(function () {
      console.error(arguments)
      socket.end()
    })
})

socket.on('error', console.error)
 socket.connect(options);