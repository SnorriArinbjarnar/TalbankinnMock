const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
   CompanyName: String,
   ExchangeRate: Number,
   PriceChangePercent: Number,
   StockBid: Number,
   StockAsk: Number,
   Volume: Number,
   Highest: Number,
   Lowest: Number,
   Currency: String
});

module.exports = mongoose.model('Stock', StockSchema);