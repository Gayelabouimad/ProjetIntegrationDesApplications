var DataAccess = require("./DataAccess");
var http = require("http");
const request = require("request");

var Model = function() {};

Model.prototype.GetOrders = async function() {
  try {
    var response = await DataAccess.GetEntities(
      "orders_microservice",
      "orders"
    );
    return response;
  } catch (err) {
    return err;
  }
};

Model.prototype.addOrder = async function(order) {
  try {
    var response = await DataAccess.putOrder(
      "orders_microservice",
      "orders",
      order
    );
    if (response) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

Model.prototype.callAPI = async function(order) {
    console.log(order);
  return new Promise(function(fulfill, reject) {
    const data = JSON.stringify(order);
    const options = {
        hostname: '192.168.99.100',
        port: 8080,
        path: '/receiveOrder',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      };
    var request = http.request(options, (res) =>{
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
            console.log(d);
          })
    });
    request.write(data);
    request.end(() => fulfill(true));

  });
};

module.exports = new Model();
