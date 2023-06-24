const mongoose = require('mongoose');

const CollectionsFilter_schema = new mongoose.Schema({
    filter_type: String,
    values: [String]
});

module.exports = mongoose.model('CollectionsFilter', CollectionsFilter_schema);