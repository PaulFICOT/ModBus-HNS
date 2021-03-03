// config.js
const config = {
    plc: {
      name: 'PLC de test',
      ip: '127.0.0.1',
      port: 8502,
      // Updating delay in ms
      updateTime: 500

    },
    webServer: {
      port: 8080
    }
   };

   module.exports = config;