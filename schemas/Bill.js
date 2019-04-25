const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    //_id: mongoose.Types.ObjectId,
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