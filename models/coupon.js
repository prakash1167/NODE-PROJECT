
    const mongoose = require('mongoose');

    const Coupon_schema = new mongoose.Schema({
        code:  {
            type: String,
            required: true
        },
        percentage: {
            type: Number,
            default: 0
        },
        status:  {
            type: String,
            default: 'inactive' //active, inactive, expired
        },
        is_scheduled: {
            type: Boolean,
            default: false
        },
        start_date: Date,
        products:[],
        end_date: Date,
        description: String,
        no_of_times_used: {
            type: Number,
            default: 0
        }
    }, {timestamps: true});
    
    module.exports = mongoose.model('Coupon', Coupon_schema);