var DataAccess = function(){
    this.MongoClient = require('mongodb').MongoClient, assert = require('assert');
    this.Mongo = require('mongodb');
    this.DBConnectionString = 'mongodb://172.22.1.154:27017';
};

DataAccess.prototype.GetEntities = async function (dbName, CollectionName){
    var that = this;
    try {
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var database = await response.db(dbName);
        var collection = await database.collection(CollectionName);
        const item = await collection.find();
        const documents = await item.toArray();
        return documents;
    }catch(err){
        if(err.name == 'MongoNetworkError'){
            console.log(err);
            return 'Connection to DB Failed';
        }
        return err;
    }
};


DataAccess.prototype.putCustomer = async function (dbName, CollectionName, data){
    try {
        var that = this;
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var database = await response.db(dbName);
        database.collection(CollectionName).insertOne(data ,function(err, res) {
            if (err) throw err;
            console.log("Documents inserted");
            return "Documents inserted";
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
