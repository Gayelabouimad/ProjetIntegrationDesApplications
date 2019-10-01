
var express = require('express');
var app = express();


var model = require('./models/booksModel');

app.get('/', function(req, res){
    res.send("hello world");
});

app.get('/getBooks', function(req, res){
    var categry = req.query.category;
    model.GetInventory(categry).then(function(docs){
        res.send(docs);
    }).catch(function(err){
        res.send(err);
    });
});

var server = app.listen(8081, 'localhost', function(){
    console.log("Server running on :", 8081);
})