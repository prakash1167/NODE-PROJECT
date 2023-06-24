const Product = require('../models/productModel');
const{upload}=require('../middlewares/uploadImage.js');
const slugify = require("slugify");
const ProductUtil = {};
let specific=[];
const mongoose = require("mongoose");
ProductUtil.select = {};
const db = () => {
  return mongoose.connection;
};
ProductUtil.insert = async(productObj) => {
    console.log(productObj);
    
   return await new Product(productObj).save();
    
    };
  //end create page
;
ProductUtil.specific=async(products)=>{
  
 specific.push(products);
 console.log(specific);

  return specific;
 


};

ProductUtil.update = async(productID, productObj) =>{
  const isValid = mongoose.Types.ObjectId.isValid(productID);
  console.log(isValid);
  const m= await Product.findOneAndUpdate({_id:{$eq:productID}}, productObj, {
    new: true,
  });console.log(m);
  return m;
   
  };
ProductUtil.delete = async(id) => {const deleteProduct =(async (req, res) => {
    const id = req.params;
    validateMongoDbId(id);
    try {
      const deleteProduct = await Product.findOneAndDelete(id);
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error);
    }
  });};
  
module.exports ={ProductUtil,specific};