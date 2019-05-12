const Customer = require('../schemas/Customer');
const Account = require('../schemas/Account');

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
            CurrentBalance: 500000,
            AccountType: 'Debet',
            AccountNumber: 'kt-26-2022'
        }),
        new Account({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Leifur'),
            CurrentBalance: 500000,
            AccountType: 'Vaxtareikningur',
            AccountNumber: 'kt-26-2023'
        }),
        new Account({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Atli'),
            CurrentBalance: 24304400,
            AccountType: 'Debet',
            AccountNumber: '2119863199-26-3039'
        }),
        new Account({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Magnús'),
            CurrentBalance: 210,
            AccountType: 'Debet',
            AccountNumber: '3243863199-21-3039'
        }),
        new Account({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Valdimar'),
            CurrentBalance: 15000,
            AccountType: 'Debet',
            AccountNumber: '6119363199-24-3039'
        }),
        new Account({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Smári'),
            CurrentBalance: 15000,
            AccountType: 'Debet',
            AccountNumber: '0019300199-24-3039'
        }),
        new Account({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Guðlaug'),
            CurrentBalance: 15000,
            AccountType: 'Debet',
            AccountNumber: '6039213192-24-3033'
        }),
        
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