const Stock = require('../Schemas/Stock');
const dotenv = require('dotenv');

const mongoose = require('mongoose');
const path = require('path');
dotenv.config({path :'../.env'});

var db = mongoose.connection.collections;
Object.keys(db).forEach(collection => {
    if(collection == 'stocks'){
        Stock.collection.drop();
    }
});


mongoose.connect( process.env.DB_CONN, {
    useNewUrlParser: true
});

var stocks = [
    new Stock({
        CompanyName: 'arion banki',
        ExchangeRate: 76.5,
        PriceChangePercent: -1.16 ,
        StockBid: 75.5,
        StockAsk: 76.5,
        Volume: 6619001313,
        Highest: 77.5,
        Lowest: 76.5,
        Currency: 'ISK'
    }),
    new Stock({
        CompanyName: 'icelandair group',
        ExchangeRate: 9.6,
        PriceChangePercent: 0.42 ,
        StockBid: 9.57,
        StockAsk: 9.6,
        Volume: 9997994,
        Highest: 9.61,
        Lowest: 9.6,
        Currency: 'ISK'
    })
];

var done = 0;
for(var i = 0; i < stocks.length; i++){
    stocks[i].save((err, result) => {
        if(err){throw new Error(err);}
        done++;

        if(done === stocks.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
