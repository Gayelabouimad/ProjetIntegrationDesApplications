var express = require('express');
var cors = require('cors');

// this is used to get json from req.body
const bodyParser = require("body-parser");

var app = express();
var model = require('./models/usersModel');

app.use(cors());
app.use(bodyParser.json());


app.get('/', function(req, res){
    res.send("Customers Microservices Root");
});


app.get('/getCustomers', function(req, res){
    model.GetCustomers().then(function(docs){
        res.send(docs);
    }).catch(function(err){
        res.send(err);
    });
});

app.post('/addCustomer', function(req, res){
    var customer = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "phoneNumber": req.body.phoneNumber,
        "book": ''
    };
    console.log("customer in backend", customer);
    model.AddCustomer(customer).then(function(docs){
        res.send(docs);
    }).catch(function(err){
        res.send(err);
    });
});


var server = app.listen(8082, function(){
    console.log("Server running on :", 8082);
});
