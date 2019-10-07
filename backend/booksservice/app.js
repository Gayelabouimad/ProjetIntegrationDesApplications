
// mongod --bind_ip 192.168.16.7
// mongod --bind_ip 172.22.1.154

// mongo 192.168.16.7
// mongo 172.22.1.154

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors())

var model = require('./models/booksModel');

app.get('/', function(req, res){
    res.send("Books Microservices Root");
});

app.get('/getBooks', function(req, res){
    model.GetInventory().then(function(docs){
        res.send(docs);
    }).catch(function(err){
        res.send(err);
    });
});
app.get('/initiateDB', function(req, res){
    var books = [
        {
            "_id": "5d92ffe677d6510df5fc2dcb",
            "name": "Le Petit Prince",
            "author": "Antoine de Saint-Exupery",
            "DOP": "April 6, 1943",
            "status": 0
        },
        {
            "_id": "5d92fffe77d6510df5fc2dcc",
            "name": "Book1",
            "author": "Author1",
            "DOP": "date1",
            "status": 0
        },
        {
            "_id": "5d93000777d6510df5fc2dcd",
            "name": "Book2",
            "author": "Author2",
            "DOP": "date2",
            "status": 0
        },
        {
            "_id": "5d99a67a30d5d30007cd1423",
            "name": "Company Inc",
            "address": "Highway 37"
        }
    ];
    model.addBook(books).then(function(docs){
        res.send(docs);
    }).catch(function(err){
        res.send(err);
    });
});


var server = app.listen(8081, function(){
    console.log("Server running on :", 8081);
});

app.get('/heartbeat', function(req, res){
    var status = {
        success: true,
        "name": "Customers Microservice",
        address: server.address().address,
        port: server.address().port,
    };
    res.send(status);
});
