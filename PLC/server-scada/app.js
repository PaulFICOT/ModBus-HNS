const modbusServer = require(__dirname+"/modbusServer.js");
const webServer = require(__dirname+"/webServer.js");


//Modbus Serv

modbusServer.server.on('connection', function (client) {
    console.log('New Connection')
  })
  
  
  modbusServer.server.on('WriteSingleRegister', function (value, address) {
    //TODO: Update the DB with server.holding.readUInt16BE(address)
  })
  
  modbusServer.server.on('writeMultipleCoils', function (value) {
    //Update DB
  })
  
  
  modbusServer.server.on('writeMultipleRegisters', function (value) {
    //Update DB
  })
  


// Web serv

// Home page get
webServer.app.get('/', function(req, res) {

    res.render('pages/index', {
      plc_name: plc_name,
      datas: variables
    });
  });
  
  // post /add route
  webServer.app.post("/add", function(req, res) {
    const variable = {
      name: req.body.name,
      comment: req.body.comment,
      address: req.body.address,
      value: req.body.value
    };
    variables.push(variable);
    res.redirect("/");
  });
  
  
  // post /update route
  webServer.app.post("/update", function(req, res) {
    //TODO: make update post function
    console.log(req.body);
    const newVar = {
      name: req.body.newName,
      comment: req.body.newComment,
      address: req.body.newAddress,
      value: req.body.newValue
    };
  
    variables.forEach(function(variable, index){
  
      if(variable.name == req.body.variableName){
        variables[index] = newVar;
      }
    });
  
    res.redirect("/");
  });
  
  // post /update route
  webServer.app.post("/delete", function(req, res) {
    const varToDelete = req.body.variableName;
    _.remove(variables, variable => variable.name == varToDelete);
  
    res.redirect("/");
  });
  
  
  webServer.app.listen(webServer.webServPort);
  console.log("Server web started on port:  " + webServer.webServPort + "...");