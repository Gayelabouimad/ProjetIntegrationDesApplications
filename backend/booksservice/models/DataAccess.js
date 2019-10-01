var DataAccess = function(){
    this.MongoClient = require('mongodb').MongoClient, assert = require('assert');
    this.Mongo = require('mongodb');
    this.DBConnectionString = 'mongodb://localhost:27017';
};


DataAccess.prototype.GetEntities = async function (dbName, CollectionName, query){
    var that = this;
    if(query){
        try{
            query = JSON.parse(query);
        }catch(exception){
            console.log(exception);
        }
    }else{
        query = {};
    }
    if(dbName == 'testing'){
        var j = { 'name1': 'gayel', 'name2': "cindy"};
        return j;
    }else{
        try {
            var response = await that.MongoClient.connect(that.DBConnectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
              });
            if(response){
                var database = await response.db(dbName);
                var collection = await database.collection(CollectionName);
                const item = await collection.find();
                const documents = await item.toArray();
                return documents;
            }
        }catch(err){
            return err;
        }
    }



    // return new Promise( function(fulfill, reject){
    //     that.MongoClient.connect(that.DBConnectionString)
    //     .then(function(db){
    //         var database = db.db(dbname);
    //         var collection = database.collection(CollectionName);
    //         collection.find(query).toArray(function (err, docs){
    //             db.close();
    //             if(err){
    //                 reject(err);
    //             }else{
    //                 fulfill(docs);
    //             }
    //         });
    //     }).catch(function(err){
    //         reject(err);
    //     })
    // })

};


module.exports = new DataAccess();
