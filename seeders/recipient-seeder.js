const Customer = require('../Schemas/Customer');
const Recipient = require('../Schemas/Recipient');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

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
            FirstName: 'Trigger',
            LastName: 'Happy',
            AccountNumber: '2039863199-26-3039',
        }),
        new Recipient({
            CustomerID: getResourceIdByName(customers, 'FirstName', 'Leifsi'),
            FirstName: 'Mumbly',
            LastName: 'Mahooney',
            AccountNumber: '1008783399-26-2029',
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