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
        LastName: 'Axelsson',
        SocialNumber: '240380-3299',
        Address: 'Dúfnahólum 10',
        City: 'Breiðholt',
        email: 'hrafninn4flygur@freedom.is'
    }),
    new Customer({
        FirstName: 'Leifur',
        LastName: 'Pálsson',
        SocialNumber: '240482-3399',
        Address: 'Dúfnahólum 12',
        City: 'Breiðholt',
        email: 'leifsip@dj.is'
    }),
    new Customer({
        FirstName: 'Smári',
        LastName: 'Guðmundsson',
        SocialNumber: '211189-2342',
        Address: 'Dúfnahólum 9',
        City: 'Breiðholt',
        email: 'ekki_leifsip@dj.is'
    }),
    new Customer({
        FirstName: 'Snorri',
        LastName: 'Arason',
        SocialNumber: '040286-2242',
        Address: 'Grafarvogur',
        City: 'Reykjavík',
        email: 'ekki_heldur_leifsip@dj.is'
    }),
    new Customer({
        FirstName: 'Atli',
        LastName: 'Jónsson',
        SocialNumber: '280873-2139',
        Address: 'Helvíti 3',
        City: 'Hard Nox',
        email: 'kittyLover_69@hotmail.com'
    }),
    new Customer({
        FirstName: 'Guðlaug',
        LastName: 'Ásgeirsdóttir',
        SocialNumber: '210101-3239',
        Address: 'Helvíti 5',
        City: 'Hard Nox',
        email: 'kittyH8er_69@hotmail.com'
    }),
    new Customer({
        FirstName: 'Línus',
        LastName: 'Gautsson',
        SocialNumber: '020294-4402',
        Address: 'Aðalstræti 6',
        City: 'Plebb town',
        email: '101Typan@hotmail.com'
    }),
    new Customer({
        FirstName: 'Valdimar',
        LastName: 'Áslaugsson',
        SocialNumber: '220991-2348',
        Address: 'Helvíti 3',
        City: 'Hard Nox',
        email: 'kittyLover_69@hotmail.com'
    }),
    new Customer({
        FirstName: 'Magnús',
        LastName: 'Geirsson',
        SocialNumber: '200591-2348',
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

