const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    CustomerID: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    CurrentBalance: Number,
    AccountType: String,
    AccountNumber: String

});

module.exports = mongoose.model('Account', AccountSchema);