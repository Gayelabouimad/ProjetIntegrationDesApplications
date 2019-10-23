var DataAccess = require('./DataAccess');

var Model = function(){};


Model.prototype.GetCustomers = async function(){
    try{
        var response = await DataAccess.GetEntities('customers_microservice', 'customers');
        return response;
    }catch(err){
        return err;
    }
};

Model.prototype.AddCustomer = async function(customer){
    try{
        var response = await DataAccess.putCustomer('customers_microservice', 'customers', customer);
        return response;
    }catch(err){
        console.log(err);
        return err;
    }
};


Model.prototype.addBookToCustomer = async function(customer, book){
    try{
        var response = await DataAccess.updateCustomer('customers_microservice', 'customers', customer, book);
        return response;
    }catch(err){
        console.log(err);
        return err;
    }
};


module.exports = new Model();

