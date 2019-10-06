
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors())

var model = require('./models/booksModel');

app.get('/', function(req, res){
    res.send("hello world");
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

var server = app.listen(8081, function(){
    console.log("Server running on :", 8081);
});
