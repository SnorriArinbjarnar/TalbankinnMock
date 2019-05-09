const mongoose = require('mongoose');

const luisLowConfidencyLogSchema = mongoose.Schema({
    UserId: String,
    UserState: String,
    Date: Date,
    LuisData: Object,
});

module.exports = mongoose.model('luisLowConfidencyLog', luisLowConfidencyLogSchema);