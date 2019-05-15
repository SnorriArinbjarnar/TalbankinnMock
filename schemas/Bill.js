const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    CustomerID: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    PayerName: String,
    Creditor: String,
    CreditorAccountNumber: String,
    DueDate: Date,
    Deadline: Date,
    Amount: Number
});

module.exports = mongoose.model('Bill', BillSchema);