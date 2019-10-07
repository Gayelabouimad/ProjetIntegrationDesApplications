
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

var model = require('./models/ordersModel');

app.get('/', function(req, res){
    res.send("Orders Microservices Root");
});

app.get('/getOrders', function(req, res){
    model.GetOrders().then(function(docs){
        res.send(docs);
    }).catch(function(err){
        res.send(err);
    });
});
app.post('/makeOrder', async function(req, res){
    var order = {
        "bookName": req.body.bookName,
        "customerID": req.body.customerID,
        "date": req.body.date,
    };
    var OrderDB_response = await model.addOrder(order);
    if(OrderDB_response){
        var API_response = await model.callAPI(order);
        if(API_response){
            res.send("Call to API Done");
        }
    }

});


var server = app.listen(8083, function(){
    console.log("Server running on :", 8083);
});

app.get('/heartbeat', function(req, res){
    var status = {
        success: true,
        "name": "Orders Microservice",
        address: server.address().address,
        port: server.address().port,
    };
    res.send(status);
});
