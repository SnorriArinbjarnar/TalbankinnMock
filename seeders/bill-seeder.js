const Customer = require('../schemas/Customer');
const Bill = require('../schemas/Bill');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
//const mongoose = require('mongoose');

const path = require('path');
dotenv.config({path :'../.env'});

var db = mongoose.connection.collections;
Object.keys(db).forEach(collection => {
    if(collection == 'bills'){
        Bill.collection.drop();
    }
});

mongoose.connect(process.env.DB_CONN, {
    //useMongoClient: true //so that it will use mongodb client under the hood
    useNewUrlParser: true
});

const getResourceIdByName = (resources, prop, value) => resources.find(elem => elem[prop] === value);

Customer.find({}, (err, customers)=> {
    var bills = [
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Bjarki'),
            PayerName: 'Bjarki',
            Creditor: 'LÍN',
            CreditorAccountNumber: '1108443139-26-222',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 22002
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Bjarki'),
            PayerName: 'Bjarki',
            Creditor: 'Mæðrastyrksnefnd',
            CreditorAccountNumber: '1108443139-26-222',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 15000
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Leifur'),
            PayerName: 'Leifur',
            Creditor: 'Adam og Eva',
            CreditorAccountNumber: '1103433139-26-222',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 64500
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Leifur'),
            PayerName: 'Leifur',
            Creditor: 'Boltaland',
            CreditorAccountNumber: '5298433139-26-222',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 3500
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Leifur'),
            PayerName: 'Leifur',
            Creditor: 'Monaco',
            CreditorAccountNumber: '5298432453-26-222',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 900000
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Leifur'),
            PayerName: 'Leifur',
            Creditor: 'Hekla',
            CreditorAccountNumber: '5298433139-11-222',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 2900000
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Smári'),
            PayerName: 'Smári',
            Creditor: 'Goldfinger',
            CreditorAccountNumber: '5298433111-22-122',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 92400
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Smári'),
            PayerName: 'Smári',
            Creditor: 'Te og kaffi',
            CreditorAccountNumber: '5298433139-26-001',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 2200
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Smári'),
            PayerName: 'Smári',
            Creditor: 'Háskólabúðin',
            CreditorAccountNumber: '5298433221-28-001',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 9900
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Snorri'),
            PayerName: 'Snorri',
            Creditor: 'Leyniþjónustan',
            CreditorAccountNumber: '5298433219-26-021',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 64300
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Snorri'),
            PayerName: 'Snorri',
            Creditor: 'Hljóðfærahúsið',
            CreditorAccountNumber: '5234433139-26-281',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 79900
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Snorri'),
            PayerName: 'Snorri',
            Creditor: 'Gleði bær',
            CreditorAccountNumber: '5298433139-26-991',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 32000
        })
    ];

    var done = 0;
    for(var i = 0; i < bills.length; i++){
        bills[i].save(function(err, result){
            if (err) { throw new Error(err); }
            done++;
            if(done == bills.length){
                exit();
            }
        })
    }
});

function exit(){
    mongoose.disconnect();
}