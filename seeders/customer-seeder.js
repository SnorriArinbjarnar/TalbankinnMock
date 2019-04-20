const Customer = require('../Schemas/Customer');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const path = require('path');
dotenv.config({path :'../.env'});


var db = mongoose.connection.collections;
Object.keys(db).forEach(collection => {
    if(collection == 'customers'){
        Customer.collection.drop();
    }
   
});

mongoose.connect(process.env.DB_CONN, {
    //useMongoClient: true //so that it will use mongodb client under the hood
    useNewUrlParser: true
});

var customers = [
    new Customer({
        FirstName: 'Bjarki',
        LastName: 'Hrafninn Flýgur',
        SocialNumber: '240380-3299',
        Address: 'Dúfnahólum 10',
        City: 'Breiðholt',
        email: 'hrafninn4flygur@freedom.is'
    }),
    new Customer({
        FirstName: 'Leifsi',
        LastName: 'P-Ozio',
        SocialNumber: '240482-3399',
        Address: 'Dúfnahólum 12',
        City: 'Breiðholt',
        email: 'leifsip@dj.is'
    })
];

var done = 0;
for(var i = 0; i < customers.length; i++){
    customers[i].save((err, result) => {
        if(err){throw new Error(err);}
        done++;

        if(done === customers.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

