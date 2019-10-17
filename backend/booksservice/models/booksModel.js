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

Model.prototype.addBook = async function(books){
    try{
        var response = await DataAccess.putBook('books_microservice', 'books', books);
        return response;
    }catch(err){
        console.log("error in the model");
        return err;
    }
};

Model.prototype.orderBook = async function(bookName){
    try{
        console.log("Model book name ", bookName);
        var response = await DataAccess.changeState('books_microservice', 'books', bookName);
        return response;
    }catch(err){
        console.log("error in the model");
        return err;
    }
};

module.exports = new Model();

