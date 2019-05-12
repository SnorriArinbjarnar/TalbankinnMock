const Customer = require('../schemas/Customer');
const CreditCard = require('../schemas/CreditCard');


const dotenv = require('dotenv');
const mongoose = require('mongoose');

const path = require('path');
dotenv.config({path :'../.env'});

var db = mongoose.connection.collections;
Object.keys(db).forEach(collection => {
    if(collection == 'creditcards'){
        CreditCard.collection.drop();
    }
   
});

mongoose.connect(process.env.DB_CONN, {
    //useMongoClient: true //so that it will use mongodb client under the hood
    useNewUrlParser: true
});

const getResourceIdByName = (resources, prop, value) => resources.find(elem => elem[prop] === value);

Customer.find({}, (err, customers)=> {
    var creditcards = [
        new CreditCard({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Bjarki'),
            CurrentBalance: 50000,
            CardType: 'VISA'
        }),
        new CreditCard({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Bjarki'),
            CurrentBalance: 150000,
            CardType: 'Mastercard'
        }),
        new CreditCard({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Smári'),
            CurrentBalance: 90000,
            CardType: 'Debit'
        }),
        new CreditCard({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Smári'),
            CurrentBalance: 123590,
            CardType: 'Debit'
        }),
        new CreditCard({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Smári'),
            CurrentBalance: 180000,
            CardType: 'VISA'
        }),
        new CreditCard({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Leifur'),
            CurrentBalance: 903580,
            CardType: 'Debit'
        })
    ];

    var done = 0;
    for(var i = 0; i < creditcards.length; i++){
        creditcards[i].save(function(err, result){
            if (err) { throw new Error(err); }
            done++;
            if(done == creditcards.length){
                exit();
            }
        })
    }
});

function exit(){
    mongoose.disconnect();
}