const mongoose = require('mongoose'); 
const{upload}=require('../middlewares/uploadImage.js');

const Product_schema= new mongoose.Schema({
   
    sku:{type:String,unique:true,requied:true} ,
    product_name: String,
    brand_name: {type:String,default:"chopard"},
    image: {
        type: String,
       
    },
    inventory:{type:Number,default:100},
    actual_price: Number,
    is_bestseller:{type:Boolean,default:false},
    no_of_offers: {type:Number,default:1},
    offer_price: Number,
    is_newArrival:{type:Boolean,required:true,default:false} ,
    no_of_sizes: {type:Number,default:1},
    is_onSale:{type:Boolean,default:false} ,
    status: String,
    description: String,
    composition_washing:{ type:String,default:"Jersey fabric: 100% cotton; woven fabric: 100% polyester, exclusive of embroideries. Wash by hand in water. Do not bleach. Iron at max. 110 °C using a damp cloth between the iron and the fabric. Do not dry clean. Do not tumble dry. Flat drying in the shade."}
}, {timestamps: true});


module.exports = mongoose.model('Product', Product_schema);