const mongoose = require('mongoose');

const RecipientSchema = mongoose.Schema({
    //_id: mongoose.Types.ObjectId,
    CustomerID: {
        type: mongoose.Types.ObjectId, 
        ref: 'Customer'
    },
    FirstName: String,
    LastName: String,
    AccountNumber: String,
});

module.exports = mongoose.model('Recipient', RecipientSchema);