const mongoose = require('mongoose');

const RecipientSchema = mongoose.Schema({
    CustomerID: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    FirstName: String,
    LastName: String,
    AccountNumber: String,
});

module.exports = mongoose.model('Recipient', RecipientSchema);