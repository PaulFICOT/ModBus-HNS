// load the things we need
let express = require('express');
let app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    let plc_name;
    plc_name = "PLC0";

    let valeurs = [
        {name: 'Ma variable1', comment: "Projet", address: "%MW0", value: 18},
        {name: 'Ma variable2', comment: "Projet", address: "%MW1", value: 19},
        {name: 'Ma variable3', comment: "Projet", address: "%MW2", value: 20},
        {name: 'Ma variable4', comment: "Projet", address: "%MW3", value: 21}
    ];

    let tagline = "Ceci est un test d'une page avec ejs";

    res.render('pages/index', {
        plc_name: plc_name,
        valeurs: valeurs,
        tagline: tagline
    });
});

app.listen(8080);
console.log('Server web port 8080...');