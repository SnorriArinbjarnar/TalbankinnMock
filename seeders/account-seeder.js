const Customer = require('../Schemas/Customer');
const Account = require('../Schemas/Account');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const path = require('path');
dotenv.config({path :'../.env'});

var db = mongoose.connection.collections;
Object.keys(db).forEach(collection => {
    if(collection == 'accounts'){
        Account.collection.drop();
    }
   
});

mongoose.connect(process.env.DB_CONN, {
    //useMongoClient: true //so that it will use mongodb client under the hood
    useNewUrlParser: true
});

const getResourceIdByName = (resources, prop, value) => resources.find(elem => elem[prop] === value);

Customer.find({}, (err, customers)=> {
    var Accounts = [
        new Account({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Bjarki'),
            CurrentBalance: 5000,
            AccountType: 'Debet',
            AccountNumber: 'kt-26-2022'
        }),
        new Account({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Leifsi'),
            CurrentBalance: 50000,
            AccountType: 'Vaxtareikningur',
            AccountNumber: 'kt-26-2023'
        }),
        new Account({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Atli'),
            CurrentBalance: 24000,
            AccountType: 'Debet',
            AccountNumber: '2119863199-26-3039'
        })
    ];

    var done = 0;
    for(var i = 0; i < Accounts.length; i++){
        Accounts[i].save(function(err, result){
            if (err) { throw new Error(err); }
            done++;
            if(done == Accounts.length){
                exit();
            }
        })
    }
});

function exit(){
    mongoose.disconnect();
}