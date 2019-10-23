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

// --------------------------------------
var mqtt = require('mqtt')
// Client Connection
var client = mqtt.connect('mqtt://192.168.16.7:1883')

client.on('connect', function () {
    console.log("Connected")
    // Client Subscription
    client.subscribe('GayelTest', function (err) {
        console.log("Subscribed");
        if(err){
            console.log("error");
        }
    })
})

// When someone else publishes data
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(JSON.parse(message.toString()));
    console.log("got a msg");
    console.log(typeof(JSON.parse(message.toString())));
    let message2 = JSON.parse(message.toString());
    model.addBookToCustomer(message2.ClientName, message2.bookName);
    // res.send(message.toString())
    // client.end()
  })
// --------------------------------------


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
        "book": req.body.book
    };
    console.log("customer in backend", req.body);
    model.AddCustomer(customer).then(function(docs){
        console.log("----------",docs)
        res.send(docs);
    }).catch(function(err){
        res.send(err);
    });
});


var server = app.listen(8082, function(){
    console.log("Server running on :", 8082);
});


app.get('/heartbeat', function(req, res){
    var status = {
        "name": "Customers Microservice",
        success: true,
        address: server.address().address,
        port: server.address().port,
    };
    res.send(status);
  });