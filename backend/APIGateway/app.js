var express = require("express");
var app = express();
var model = require('./models/gatewayModel');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//  MQTT
var mqtt = require('mqtt');


// handle the request
app.post('/processData', async function (req, res) {

  var client  = mqtt.connect('mqtt://127.0.0.1:1883')
  // client.on('connect', function () {
  //   console.log("Connected")
  //   client.subscribe('GayelTest', function (err) {
  //     console.log("Subscribed")

  //     if (!err) {
  //       client.publish('GayelTest', req.body.data)
  //     }else{
  //       console.log("erroor")
  //     }
  //   })
  // })
   
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    res.send(message.toString())
    client.end()
  })

});







app.get("/", function(req, res) {
  res.send("API Gateway Root");
});

app.get("/getStatus", async function(req, res) {
  let services = [
    {
      name: "Books Microservice",
      url: "http://192.168.99.100",
      address: "192.168.99.100",
      port: 8081
    },
    {
      name: "Customers Microservice",
      url: "http://192.168.99.100",
      address: "192.168.99.100",
      port: 8082
    },
    {
      name: "Orders Microservice",
      url: "http://192.168.99.100",
      address: "192.168.99.100",
      port: 8083
    },
  ];
  var promises = await model.GetStatus(services);
  Promise.all(promises)
    .then(function(values) {
      for (var i = 0; i < values.length; i++) {
        var value = values[i];

        if (value.address && value.port) {
          for (var j = 0; j < services.length; j++) {
            if ( services[j].address == value.address && services[j].port == value.port ) {
              value.config = services[j];
            }
          }
        }
      }
      res.send(values);
    })
    .catch(function(err) {
      res.send(err);
    });
});


app.post("/receiveOrder", async function(req, res) {
  console.log("res.body", req.body);
  res.send("Call is fine");
});

var server = app.listen(8080, function() {
  console.log("Server running on :", 8080);
});
