const Customer = require('../schemas/Customer');
const Recipient = require('../schemas/Recipient');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

const path = require('path');
dotenv.config({path :'../.env'});

var db = mongoose.connection.collections;
Object.keys(db).forEach(collection => {
    if(collection == 'recipients'){
        Recipient.collection.drop();
    }
   
});

mongoose.connect(process.env.DB_CONN, {
    //useMongoClient: true //so that it will use mongodb client under the hood
    useNewUrlParser: true
});

const getResourceIdByName = (resources, prop, value) => resources.find(elem => elem[prop] === value);

Customer.find({}, (err, customers)=> {
    var recipients = [
        new Recipient({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Bjarki'),
            FirstName: 'Smári',
            LastName: 'Guðmundsson',
            AccountNumber: '0019300199-24-3039',
        }),
        new Recipient({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Leifur'),
            FirstName: 'Guðlaug',
            LastName: 'Ásgeirsdóttir',
            AccountNumber: '6039213192-24-3033',
        }),
        new Recipient({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Bjarki'),
            FirstName: 'Leifur',
            LastName: 'Pálsson',
            AccountNumber: 'kt-26-2023',
        }),
        new Recipient({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Smári'),
            FirstName: 'Bjarki',
            LastName: 'Axelsson',
            AccountNumber: 'kt-26-2022',
        }),
        new Recipient({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Smári'),
            FirstName: 'Valdimar',
            LastName: 'Áslaugsson',
            AccountNumber: '6119363199-24-3039',
        }),
        new Recipient({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Smári'),
            FirstName: 'Leifur',
            LastName: 'Pálsson',
            AccountNumber: 'kt-26-2023',
        })
    ];

    var done = 0;
    for(var i = 0; i < recipients.length; i++){
        recipients[i].save(function(err, result){
            if (err) { throw new Error(err); }
            done++;
            if(done == recipients.length){
                exit();
            }
        })
    }
});

function exit(){
    mongoose.disconnect();
}