const slugify = require("slugify");
const HomeUtil = require('../models/admin_home_content');
const{uploadPhoto}=require('../middlewares/uploadImage.js');

HomeUtil.select = {};
HomeUtil.select.getOrderByID = async() => {};
HomeUtil.insert = async(homeObj) => {
    console.log('before inserting order: ' + homeObj);
    return await new admin_home_content(homeObj).save();
};
HomeUtil.update = async(id, orderObj) => {

};
HomeUtil.delete = async(id) => {};

module.exports = HomeUtil;