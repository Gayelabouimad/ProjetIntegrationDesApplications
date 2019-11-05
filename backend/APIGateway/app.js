var express = require("express");
var app = express();
var model = require('./models/gatewayModel');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var http = require('http');

var cors = require('cors');

app.use(cors())

// --------------------------------------
//  MQTT
var mqtt = require('mqtt');

app.post("/receiveOrder", async function (req, res) {
  console.log("fet 3al received", req.body.bookName)

  var client = mqtt.connect('mqtt://192.168.16.7:1883');
  client.on('connect', function () {
    console.log("Connected")
    client.subscribe('GayelTest', function (err) {
      console.log("Subscribed")
      var message = JSON.stringify(req.body);
      if (!err) {
        client.publish('GayelTest', message)
      } else {
        console.log("erroor")
      }
    })
  })
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    res.send(message.toString())
    client.end()
  })
});
// --------------------------------------

app.get("/", function (req, res) {
  res.send("API Gateway Root");
});

app.get("/getStatus", async function (req, res) {
  let services = [
    {
      name: "Books Microservice",
      url: "http://192.168.99.100",
      address: "192.168.99.100",
      port: 8084
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
    .then(function (values) {
      for (var i = 0; i < values.length; i++) {
        var value = values[i];

        if (value.address && value.port) {
          for (var j = 0; j < services.length; j++) {
            if (services[j].address == value.address && services[j].port == value.port) {
              value.config = services[j];
            }
          }
        }
      }
      res.send(values);
    })
    .catch(function (err) {
      res.send(err);
    });
});

app.get('/getBooks', async function (req, res) {
  const options = {
    hostname: '192.168.99.100',
    port: 8084,
    path: '/getBooks',
    method: 'GET'
  };

  http.get(options, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.send(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

app.get('/getCustomers', async function (req, res) {
  const options = {
    hostname: '192.168.99.100',
    port: 8082,
    path: '/getCustomers',
    method: 'GET'
  };

  http.get(options, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.send(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

app.post('/addCustomer', function(req, res){
  var customer = {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "phoneNumber": req.body.phoneNumber,
      "book": req.body.book
  };
  const data = JSON.stringify(customer)
  console.log(" ana hon ")
  
  const options = {
    hostname: '192.168.99.100',
    port: 8082,
    path: '/addCustomer',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  const requ = http.request(options, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(data)
      res.send(data);
    });
  })
  requ.on("error", (err) => {
    console.log("Error: " + err.message);
  });
  requ.write(data)
  requ.end()


});

var server = app.listen(8080, function () {
  console.log("Server running on :", 8080);
});
