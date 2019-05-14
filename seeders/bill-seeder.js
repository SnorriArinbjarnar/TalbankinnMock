const Customer = require('../schemas/Customer');
const Bill = require('../schemas/Bill');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
//const mongoose = require('mongoose');

const path = require('path');
dotenv.config({ path: '../.env' });

var db = mongoose.connection.collections;
Object.keys(db).forEach(collection => {
    if (collection == 'bills') {
        Bill.collection.drop();
    }
});

mongoose.connect(process.env.DB_CONN, {
    //useMongoClient: true //so that it will use mongodb client under the hood
    useNewUrlParser: true
});

const getResourceIdByName = (resources, prop, value) => resources.find(elem => elem[prop] === value);

Customer.find({}, (err, customers) => {
    var bills = [
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Bjarki'),
            PayerName: 'Bjarki',
            Creditor: 'LÍN',
            CreditorAccountNumber: '1108443139-26-222',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 1500000
        }),
        new Bill({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Bjarki'),
            PayerName: 'Bjarki',
            Creditor: 'Mæðrastyrksnefnd',
            CreditorAccountNumber: '1108443139-26-222',
            DueDate: Date.now(),
            Deadline: Date.now(),
            Amount: 15000
        })
    ];

    var done = 0;
    for (var i = 0; i < bills.length; i++) {
        bills[i].save(function (err, result) {
            if (err) { throw new Error(err); }
            done++;
            if (done == bills.length) {
                exit();
            }
        })
    }
});

function exit() {
    mongoose.disconnect();
}