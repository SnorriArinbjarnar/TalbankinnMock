const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    //_id: mongoose.Types.ObjectId,
    FirstName: String,
    LastName: String,
    SocialNumber: String,
    Address: String,
    City: String,
    email: String
});

module.exports = mongoose.model('Customer', customerSchema);