const mongoose = require('mongoose');

const luisLowConfidencySchema = mongoose.Schema({
    UserId: String,
    UserState: String,
    Date: Date,
    LuisData: Object,
});

module.exports = mongoose.model('LuisLowConfidency', luisLowConfidencySchema);