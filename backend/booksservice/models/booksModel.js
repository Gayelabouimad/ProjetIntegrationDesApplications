var DataAccess = require('./DataAccess.js');

var Model = function(){};


Model.prototype.GetInventory = async function(category){
    var query = {};
    if(category){
        query.category = category;
    }
    console.log("fetet la hon");
    try{
        var response = await DataAccess.GetEntities('testing', 'books', query);
        console.log(response);
        return response;
    }catch(err){
        return err;
    }

    // return new Promise( function( fulfill, reject){
    //     DataAccess.GetEntities('books_microservice', 'books', query)
    //     .then(function(docs){
    //         console.log(docs);
    //         fulfill(docs);
    //     }).catch(function(err){
    //         console.log(err);
    //         reject(err);
    //     });
    // });
};

module.exports = new Model();

