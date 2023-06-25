const express = require('express');
const mongoose = require("mongoose");
const{upload}=require('../middlewares/uploadImage')
let bodyParser = require('body-parser');
const path = require('path');

const adminRouter = express.Router();
const Product = require('../models/productModel');
const Order = require('../models/Order.js');
adminRouter.use(bodyParser.json());

    //const ejs=require('express-ejs')
// db util
const { ProductUtil,specific}= require('../db_util/product_util.js');
const HomeUtil = require('../db_util/homepage_util.js');
const DiscountUtil = require('../db_util/discount_util.js');
const OrderUtil = require('../db_util/order_util.js');
const Coupon = require('../models/coupon');
const Specific = require('../db_util/specific');
//GET
adminRouter.get('/', (req, res) => {
    res.render(path.resolve(__dirname + '/../public/html/admin/homepage-editor.ejs'));
});
adminRouter.get('/homepageeditor', (req, res) => {
    res.render(path.resolve(__dirname + '/../public/html/admin/homepage-editor.ejs'));
});
adminRouter.get('/addproduct', (req, res) => {
    res.render(path.resolve(__dirname + '/../public/html/admin/add-product.ejs'));
});
adminRouter.get('/orders', async(req, res) => {
    const orders= await Order.find().exec();
    res.render(path.resolve(__dirname + '/../public/html/admin/admin-orders.ejs'),
    {Orders:orders});
});
adminRouter.get('/discounts', async(req, res) => {
    const couponList= await Coupon.find().exec();
    res.render(path.resolve(__dirname + '/../public/html/admin/discount.ejs'),
    {Coupons:couponList});  
});
adminRouter.get('/creatediscount', async(req, res) => {
    const productList= await Product.find().exec();
    res.render(path.resolve(__dirname + '/../public/html/admin/create-discount.ejs'),{Products:productList});
});
adminRouter.get('/orderconfirmation', (req, res) => {
    res.render(path.resolve(__dirname + '/../public/html/admin/order-confirmation.ejs'));
});
adminRouter.get('/products', async(req, res) => {
  const productList= await Product.find().exec();
  res.render(path.resolve(__dirname + '/../public/html/admin/admin-collection.ejs'),
  {Products:productList});
})
;
// NOTE: 'product' is singular
adminRouter.get('/editproduct/:id', async(req, res) => {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
  try {
      const findProduct = await Product.findById(id);
      res.render(path.resolve(__dirname + '/../public/html/admin/edit-product.ejs'),{Product:findProduct});
   } catch (error) {
      throw new Error(error);
   } 
});
adminRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});
adminRouter.post('/homepage',upload.single('image'), async(req, res) => {
    const file = req.file;
    if(!file) return res.status(400).send('No image in the request')
    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/images/`
    
    console.log(req.file);
 
      let homeObj={
        bg_color:req.body.bg_color,
        logo_image: `${basePath}${fileName}`,
          text_color:req.body.text_color,
          font_size:req.body.font_size,
          font_weight:req.body.font_weight,
          text_align:req.body.text_align,
          slides:req.body.slides
      }
      let insertedRec = await HomeUtil.insert(homeObj);
})
adminRouter.post('/product',upload.single('image'), async(req, res) => {
   
    const file = req.file;
    if(!file) return res.status(400).send('No image in the request')
    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/images/`
    
    console.log(req.file);
 
      let productObj={
          product_name:req.body.product_name,
          image: `${basePath}${fileName}`,
          sku:req.body.sku,
          status:req.body.status,
          description:req.body.description,
          offer_price:req.body.offer_price
      }
    let insertedRec = await ProductUtil.insert(productObj);
    if(insertedRec != undefined && insertedRec != null) {
        res.redirect('/admin/products')
    } else {
        res.send(JSON.stringify({
            error: 'Something went wrong',
            message: 'failed to add'
        }));
    }
});

adminRouter.post('/discount', async(req, res) => {
   let reqPayload = req.body;
    const productList= await Product.find().exec();
    const products=specific[0];
    console.log(products);
    const selected=reqPayload.addedproducts;
    console.log(selected);
 
    if (selected==='all'){
let added= productList;
console.log('payload: ' + JSON.stringify(reqPayload));
if(reqPayload == undefined || reqPayload == null) {
    res.send(401);
    return;
}
// let couponDetails = ['code', 'percentage', 'status', 'start_date', 'end_date','addedproducts'];
let couponObj = {
    code:req.body.code,
    percentage: req.body.percentage,
    status: req.body.status,
    start_date: req.body.start_date,
    end_date:req.body.end_date,
    products:added
};
//  for(let i = 0; i < couponDetails.length; i++) {
  //  if(reqPayload[couponDetails[i]] != undefined && reqPayload[couponDetails[i]] != null) {
       // couponObj[couponDetails[i]] = reqPayload[couponDetails[i]];
   // }
//  }
//couponObj[couponDetails[products]]=req.session.products;
//
console.log('before insertion: ' + JSON.stringify(couponObj));
let insertedRec = await DiscountUtil.insert(couponObj);
if(insertedRec != undefined && insertedRec != null) {
    res.send(JSON.stringify({
        message: 'added successfully',
        _id: insertedRec._id
    }));
} else {
    res.send(JSON.stringify({
        error: 'Something went wrong',
        message: 'failed to add'
    }));
}
    }
    else if(selected==='specific'){
      //let  added=products;
     // let w=[];
      let z=[];
      for(let i=0;i<products.length;i++)
     {let query={_id:products[i]}
     //w.push(query);
     const List= await Product.find(query).exec();
     z.push(List[0]);
      console.log(query);}
     // console.log(w);
      console.log(z);
      let  added=z;
   
       console.log('payload: ' + JSON.stringify(reqPayload));
       if(reqPayload == undefined || reqPayload == null) {
           res.send(401);
           return;
       }
     
       let couponObj = {
           code:req.body.code,
           percentage: req.body.percentage,
           status: req.body.status,
           start_date: req.body.start_date,
           end_date:req.body.end_date,
           products:added
       };
 
       console.log('before insertion: ' + JSON.stringify(couponObj));
       let insertedRec = await DiscountUtil.insert(couponObj);
       if(insertedRec != undefined && insertedRec != null) {
           res.send(JSON.stringify({
               message: 'added successfully',
               _id: insertedRec._id
           }));
       } else {
           res.send(JSON.stringify({
               error: 'Something went wrong',
               message: 'failed to add'
           }));
       }
    }

});

//PUT (update operation)
adminRouter.get('/:id/editdiscount', async(req, res) => {
    let {id} = req.params;
    // let product_id={$toObjectId: id}
     const isValid = mongoose.Types.ObjectId.isValid(id);
    
   console.log(isValid);
   console.log(id);
     let coupon =await Coupon.find({_id:{$eq:id}});
 console.log(coupon[0]);
    res.render(path.resolve(__dirname + '/../public/html/admin/edit-discount.ejs'),{Products:coupon[0].products,Coupon:coupon[0]});
});
adminRouter.post('/editdiscount', async(req, res) => {
  
    try { 
      const updateProduct = await Coupon.findOneAndUpdate({_id:{$eq:productID}}, req.body, {
        new: true,
      });
      res.redirect('/admin/discounts')
    } catch (error) {
      throw new Error(error);
    }
});
adminRouter.post('/editproduct',upload.single('image'), async(req, res) => {
   // const id = req.params;
    //const isValid = mongoose.Types.ObjectId.isValid(id);
    const file = req.file;
    if(!file) return res.status(400).send('No image in the request')
    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/images/`
  let  productID=req.body.productID
    console.log(productID);
    let productObj={
        product_name:req.body.product_name,
        image: `${basePath}${fileName}`,
        sku:req.body.sku,
        status:req.body.status,
        description:req.body.description,
        offer_price:req.body.offer_price
    }
    console.log(productObj);
    let insertedRec=await ProductUtil.update(productID,productObj);
    if(insertedRec != undefined && insertedRec != null) {
        res.redirect('/admin/products');
    } else {
        res.send(JSON.stringify({
            error: 'Something went wrong',
            message: 'failed to add'
        }));
    }
    
});
//DELETE
adminRouter.get('/editorder/:id', async(req, res) => {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    try {
      const findOrder = await Order.findById({$eq:id});
      console.log(findOrder);
      res.render(path.resolve(__dirname + '/../public/html/admin/admin-order-details.ejs'),{Order:findOrder});
    } catch (error) {
    throw new Error(error);
    } 
});
adminRouter.get('/createlable',async(req,res)=>{
   console.log(req.body.findOrder);
   console.log(req.params);
   findOrder=req.body.findOrder;
   console.log(findOrder);
    //res.render(path.resolve(__dirname + '/../public/html/admin/admin-order-confirmation.ejs'),{Order:findOrder}); 
})
adminRouter.get('/editorder', async(req, res) => {
  
});
//adminRouter.get('/editorder/', async(req, res) => {
   
  
//});
adminRouter.post('/specific_products',async(req,res)=>{
    console.log(req.body); 
  const products=req.body.productsto;
  console.log(products);
  let insertedRec=await ProductUtil.specific(products);
console.log(insertedRec);
   //req.body.productsto;

})
module.exports = adminRouter;