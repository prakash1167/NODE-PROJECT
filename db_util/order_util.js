const Order = require('../models/Order.js');
const slugify = require("slugify");
const OrderUtil = {};
OrderUtil.select = {};
OrderUtil.select.getOrderByID = async() => {};
OrderUtil.insert = async(orderObj) => {
    console.log('before inserting order: ' + orderObj);
    return await new Order(orderObj).save();
};
OrderUtil.update = async(id, orderObj) => {};
OrderUtil.delete = async(id) => {};

module.exports = OrderUtil;