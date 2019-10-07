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


DataAccess.prototype.putOrder = async function (dbName, CollectionName, data){
    try {
        var that = this;
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var database = await response.db(dbName);
        var databaseres = await database.collection(CollectionName).insertOne(data);
        if(databaseres.result.ok){
            return databaseres.result.ok;
        }else{
            return String("error in put order");
        }
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
