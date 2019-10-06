var DataAccess = require('./DataAccess.js');

var Model = function(){};


Model.prototype.GetInventory = async function(){
    try{
        var response = await DataAccess.GetEntities('books_microservice', 'books');
        return response;
    }catch(err){
        return err;
    }
};

Model.prototype.addBook = async function(){
    try{
        var response = await DataAccess.putBook('books_microservice', 'books');
        return response;
    }catch(err){
        console.log("error in the model");
        return err;
    }
};

module.exports = new Model();

