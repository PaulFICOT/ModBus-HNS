var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
const webServer = require(__dirname+"/webServer.js");

 
// open connection to a tcp line
client.connectTCP("127.0.0.1", { port: 8502 });
client.setID(1);
 
// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
setInterval(function() {
  webServer.Words.forEach(word => {
    client.readHoldingRegisters(word.address, 1, function(err, data) {
      word.value  = data.data;
  });

  });
  webServer.Bits.forEach(bit => {
    client.readCoils(bit.address, 1, function(err, data) {
      bit.value  = data.data[0];
  });

  });
  
}, 100);

exports.writeRegister = client.writeRegister;
