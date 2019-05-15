const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    SocialNumber: String,
    Address: String,
    City: String,
    email: String
});

module.exports = mongoose.model('Customer', customerSchema);