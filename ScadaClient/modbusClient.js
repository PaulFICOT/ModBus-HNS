'use strict'

const modbus = require('jsmodbus')
const net = require('net')
const socket = new net.Socket()
const options = {
  'host': '127.0.0.1',
  'port': '8502'
}



function readRegisters() {
  let retour;
  const client = new modbus.client.TCP(socket)

  socket.on('connect', async function () {
    retour = await client.readHoldingRegisters(0, 10)
      .then(function (resp) {
        const value = resp.response._body.valuesAsArray;
        
        socket.end()
        return value;
      }).catch(function () {
        console.error(require('util').inspect(arguments, {
          depth: null
        }))
        socket.end()
      })
      console.log("fin de promesse");
    console.log(retour);
  })
  
  socket.on('error', console.error)
  socket.connect(options)
  console.log("fin de fonction : "+retour);
}

readRegisters();
exports.readRegisters = readRegisters;