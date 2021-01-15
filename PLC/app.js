const express = require("express");

const app = express();


app.get("/", function(req, res){
	res.send("Server working");
});


app.listen(80, ()=> console.log("Server started at the port 80"));
