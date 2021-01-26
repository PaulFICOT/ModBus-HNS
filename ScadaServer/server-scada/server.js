// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    var valeurs = [
        { name: 'Ma variable1', comment: "Projet", address: "%MW0", value: 18},
        { name: 'Ma variable2', comment: "Projet", address: "%MW1", value: 19},
        { name: 'Ma variable3', comment: "Projet", address: "%MW2", value: 20},
        { name: 'Ma variable4', comment: "Projet", address: "%MW3", value: 21}
    ];

    var tagline = "Ceci est un test d'une page avec ejs";

    res.render('pages/index', {
        valeurs: valeurs,
        tagline: tagline
    });
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('Serveur web port 8080...');
