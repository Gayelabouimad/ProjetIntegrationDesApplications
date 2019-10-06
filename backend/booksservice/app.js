
// mongod --dbpath "C:\Users\user\Desktop\Semestre 9\Integration Des Applications\ProjetIntegrationDesApplications\database\data\db" --bind_ip 192.168.16.7

// mongo 192.168.16.7




var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors())

var model = require('./models/booksModel');

app.get('/', function(req, res){
    res.send("hello world !!");
});

app.get('/getBooks', function(req, res){
    model.GetInventory().then(function(docs){
        res.send(docs);
    }).catch(function(err){
        res.send(err);
    });
});
app.get('/insertBook', function(req, res){
    // var categry = req.query.category;
    model.addBook().then(function(docs){
        res.send(docs).header({
            "Access-Control-Allow-Credentials": true
        });
    }).catch(function(err){
        res.send(err);
    });
});

app.get('/heartbeat', function(req, res){
    var status = {
        success: true,
        // address: server.address().address,
        // port: server.address().port,
    };
    res.send(status);
});

var server = app.listen(8081, function(){
    console.log("Server running on :", 8081);
});
