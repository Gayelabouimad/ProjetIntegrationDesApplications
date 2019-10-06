var DataAccess = function(){
    this.MongoClient = require('mongodb').MongoClient, assert = require('assert');
    this.Mongo = require('mongodb');
    this.DBConnectionString = 'mongodb://192.168.16.7:27017';
};

DataAccess.prototype.GetEntities = async function (dbName, CollectionName){
    var that = this;
    if(dbName == 'testing'){
        var j = { 'name1': 'gayel', 'name2': "cindy"};
        return j;
    }else{
        try {
            var response = await that.MongoClient.connect(that.DBConnectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
              }
            );
            // console.log("response :", response);
            // console.log("ANA HONN")
            var database = await response.db(dbName);
            var collection = await database.collection(CollectionName);
            const item = await collection.find();
            const documents = await item.toArray();
            return documents;
        }catch(err){
            // console.log(err.name);
            if(err.name == 'MongoNetworkError'){
                console.log("---------hello-----------Connection to DB Failed");
                console.log(err);
                return 'Connection to DB Failed';
            }
            return err;
        }
    }
};

DataAccess.prototype.putBook = async function (dbName, CollectionName){
    try {
        var that = this;
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var database = await response.db(dbName);
        var myobj = { name: "Company Inc", address: "Highway 37" };

        database.collection(CollectionName).insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
    }catch(err){
        console.log(err.name);
        if(err.name == 'MongoNetworkError'){
            console.log(err);
            return 'Connection to DB Failed';
        }
        return err;
    }
};


module.exports = new DataAccess();
