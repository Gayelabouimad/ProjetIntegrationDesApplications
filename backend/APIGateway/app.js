var express = require("express");
var app = express();
var model = require('./models/gatewayModel');


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
  ];

  var promises = await model.GetStatus(services);
//   console.log("promises", promises);
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

var server = app.listen(8080, function() {
  console.log("Server running on :", 8080);
});
