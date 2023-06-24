const mongoose = require('mongoose');

const NewArrival_schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    shop_address: String
}, {timestamps: true});

module.exports = mongoose.model('NewArrival', NewArrival_schema);