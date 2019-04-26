const mongoose = require('mongoose');

const mainApiErrorLogSchema = mongoose.Schema({
    UserId: String,
    Date: Date,
    Error: Object,
});

module.exports = mongoose.model('mainApiErrorLog', mainApiErrorLogSchema);