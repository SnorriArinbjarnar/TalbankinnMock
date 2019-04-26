const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    //_id: mongoose.Types.ObjectId,
    CustomerID: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    CurrentBalance: Number,
    AccountType: String,
    AccountNumber: String

});

module.exports = mongoose.model('Account', AccountSchema);