const mongoose = require('mongoose');

const Order_schema = new mongoose.Schema({
    order_no: String,
    date: Date,
    shippingdetails:[],
    contactdetails:[],
    payment_status: {type:String,default:'paid'},
    fulfillment_status: {type:String,default:'paid'},
   cart:[],
   total_price:Number
}, {timestamps: true});

module.exports = mongoose.model('Order', Order_schema);