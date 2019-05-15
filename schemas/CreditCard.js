const mongoose = require('mongoose');

const CreditcardSchema = mongoose.Schema({
    CustomerID: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    CurrentBalance: Number,
    CardType: String

});

module.exports = mongoose.model('CreditCard', CreditcardSchema);