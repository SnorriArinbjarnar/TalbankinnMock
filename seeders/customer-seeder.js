const Customer = require('../schemas/Customer');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

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
    }),
    new Customer({
        FirstName: 'Atli',
        LastName: 'Jónsson',
        SocialNumber: '280495-1539',
        Address: 'Helvíti 3',
        City: 'Hard Nox',
        email: 'kittyLover_69@hotmail.com'
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

