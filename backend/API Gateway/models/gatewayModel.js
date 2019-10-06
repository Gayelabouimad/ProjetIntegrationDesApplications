var http = require('http');

var Model = function(){};

Model.prototype.GetStatus = async function(services){
    var promises = [];
    for(var i = 0; i < services.length; i++){
        var url = services[i].url + ":" + services[i].port + "/heartbeat";
        promises.push(await this.GetMicroserviceData(url));
    }
    return promises;
};

Model.prototype.GetMicroserviceData = async function(url){

	return new Promise(function(fulfill, reject){
        var request = http.get(url, res => {
            if (res.statusCode < 200 ||
                res.statusCode > 299) {
                    reject(new Error('Error status code: '
                    + res.statusCode));
            }
            var body = "";
            res.setEncoding("utf8");
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {

                body = JSON.parse(body);
                console.log(body);
                try{
                    fulfill(body);
                } catch(exception){
                    reject(exception);
                }

                if(body && body.success){
                    fulfill(body.result);
                }
            });
        });

        request.on("error", function(err){
            err.success = false;
            fulfill(err);
        });
    });
};


module.exports = new Model();
