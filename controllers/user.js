const express = require('express');
const userRouter = express.Router();
const User = require('../models/User.js');
const path = require('path');
const mongoose = require("mongoose");
const Coupon = require('../models/coupon.js');
const Product = require('../models/productModel.js');
const Order = require('../models/Order.js');
const Cart = require('../db_util/cart.js');
// db utils
const ProductUtil = require('../db_util/product_util.js');
const OrderUtil = require('../db_util/order_util.js');
const { AsyncResource } = require('async_hooks');
// GET methods
userRouter.get('/', async(req, res) => {
    // load user index page
    if(req.session.useremail == undefined || req.session.useremail == '') {
        res.redirect('/login');
    } else {
      let queryObj = { is_bestseller: true };
     const products=await Product.find(queryObj).exec();
     console.log(products);
     let queryObjnew = { is_newArrival: true };
     const new_Products=await Product.find(queryObjnew).exec();
      res.render(path.resolve(__dirname + '/../public/html/user/index.ejs'),{Products:products,products:new_Products});
  }
});

userRouter.get('/banners', (req, res) => {
    // get banners
});

userRouter.get('/register', (req, res) => {
    if(req.session.useremail == undefined || req.session.useremail == '') {
        res.sendFile(path.resolve(__dirname + '/../public/html/user/register.html'));
    } else {
        res.render(path.resolve(__dirname + '/../public/html/user/index.ejs'));
    }
});

userRouter.get('/logout', (req, res) => {
    req.session.destroy();
    console.log('session destroyed');
    res.redirect('/login');
});
userRouter.get('/collections', async(req, res) => {  // how to load contents
    // load collections page
    const productList= await Product.find().exec();
    res.render(path.resolve(__dirname + '/../public/html/user/collections.ejs'),
    {Products:productList});  
    // note: page contents are loaded using AJAX
});
userRouter.get('/:id/product', async(req, res) => { // how to load specific product?
    // get the product details pageconst
    let {id} = req.params;
   // let product_id={$toObjectId: id}
    const isValid = mongoose.Types.ObjectId.isValid(id);
  console.log(isValid);
  console.log(id);
 let product =await Product.find({_id:{$eq:id}});

console.log(product[0]);
  res.render(path.resolve(__dirname + '/../public/html/user/product.ejs'),{Product:product[0]});
 
});

userRouter.get('/checkout', (req, res) => {    // not '/product' POST
    // add the product to cart table
   let w=Cart.getCart();
   console.log(w.products);
       res.render(path.resolve(__dirname + '/../public/html/user/checkout.ejs'),{cart: w});
    // notify user the status
  });
       // load the product content for that id
  userRouter.get('/cart', (req, res) => {    // not '/product' POST
      // add the product to cart table
      let w=Cart.getCart();
        res.render(path.resolve(__dirname + '/../public/html/user/cart.ejs'),{ cart:w});
      // notify user the status
  });
  userRouter.get('/orderdetails/:id', async(req, res) => {    // not '/product' POST
    // add the product to cart table
    let {id} = req.params;     
    // let product_id={$toObjectId: id}
     const isValid = mongoose.Types.ObjectId.isValid(id);
   console.log(isValid);
   console.log(id);
  let order =await Order.find({order_no:{$eq:id}});
     res.render(path.resolve(__dirname + '/../public/html/user/order-details.ejs'),{Order:order[0],cart:order[0].cart[0]});
    // notify user the status
  });
  userRouter.get('/orders', async(req, res) => {    // not '/product' POST
    // add the product to cart table
    const orderList= await Order.find().exec();
    console.log(orderList);
    res.render(path.resolve(__dirname + '/../public/html/user/order.ejs'),{Orders:orderList});
    // notify user the status
  });
//POST methods
userRouter.post('/register', async(req, res) => {
    console.log('inside /register POST');
    // get the user input
    let reqPayload = req.body;
    let useremail = reqPayload.useremail;
    let userpass = reqPayload.userpass;
    if(useremail == undefined || useremail == '' || userpass == undefined || userpass == '') {
        console.log('empty form');
        return;
    }
    const findUser = await User.findOne({ email: useremail });
    if (!findUser) {
      /**
       * TODO:if user not found user create a new user
       */
      const newUser = new User({
        email: useremail,
        password: userpass
    });
    // put an entry in db
    newUser.save();
    console.log('user added to DB');
    } else {
     return res.redirect('/register');
    }
    res.setHeader('content-type', 'application/json');
    res.send({redirectUrl: '/'});

});

userRouter.post('/checkout',async (req, res) => {
    console.log('inside /checkout POST');
     let contactDetails = {name:'',email:'',phone:'',address:'',post:''};
    let shippingDetails ={name:'',email:'',phone:'',address:'',post:''};
    const cart=Cart.getCart();
    console.log(cart.products);
  
      contactDetails.name=req.body.contactname;
      contactDetails.email=req.body.contactemail;
      contactDetails.phone=req.body.contactphone;
      contactDetails.address=req.body.contactaddress;
      contactDetails.post=req.body.contactpost;
      shippingDetails.name=req.body.shippingname;
      shippingDetails.email=req.body.shippingemail;
      shippingDetails.phone=req.body.shippingphone;
      shippingDetails.address=req.body.shippingaddress;
      shippingDetails.post=req.body.shippingpost;
      const contact=contactDetails;
      const ship=shippingDetails;
     
  console.log(contactDetails);
  const ordernum=Math.floor(Date.now() * Math.random());
      let orderObj = {
        order_no:ordernum,
        date:Date.now(),
        contactdetails:contact,
        shippingdetails:ship,
        cart:cart,
        total_price:cart.totalPrice
      };
  console.log(orderObj);
    let insertedRec =await OrderUtil.insert(orderObj);
      if(insertedRec != undefined && insertedRec != null) {
         req.session.order_no = insertedRec.order_no;
         res.redirect('/order-success');
         // res.render(path.resolve(__dirname + '/../public/html/user/order-success.ejs'),{Order:insertedRec});
         console.log('db created successfully')
     } else {
          res.send(JSON.stringify({
             error: 'Something went wrong',
             message: 'failed to add'
         }));
     }
  });

  userRouter.get('/order-success', (req, res) => {
    if(req.session.order_no != undefined && req.session.order_no != null) {
      let order = {order_no: req.session.order_no};
      Cart.delete();
      res.render(path.resolve(__dirname + '/../public/html/user/order-success.ejs'),{Order:order});
    } else {
      res.redirect('/');
    }
    
  });

  userRouter.post('/cart/:id', async(req, res)=> {
    const{id}=req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    console.log(isValid);
    const qty=Number(req.body.qty);
   console.log(qty);
    let product= await Product.find({_id:{$eq:id}});
    //console.log(product[0]);
    product[0].qty=qty; 
  let addedProduct=product[0];
   console.log(typeof(addedProduct.qty));
    Cart.save(addedProduct);
    res.redirect('/cart');
   });
   userRouter.post('/applycoupon',async(req,res)=>{
      const {coupon}=req.body;
      if(coupon != undefined && coupon != null){
        const validCoupon=await Coupon.findOne({code:coupon});
        if(validCoupon!=null ||validCoupon!=undefined){
          const cart=Cart.getCart();
          Cart.applycoupon(validCoupon.products,validCoupon.percentage)
          res.redirect('/cart');
        }
       // console.log(validCoupon);
       else{
        res.redirect('/cart');
      }
      }
      else{
        res.redirect('/cart');
      }
   })
   userRouter.post('/deleteCart/cart', (req, res, next) => {
  console.log(req.body.productID);
    Cart.delete(req.body.productID);
    res.redirect('/cart');
  });

userRouter.post('/updatecart/:id',(req,res)=>{
console.log(req.body.updates);
console.log(req.body.productID);
const ProductID = req.body.productID;
const qty=req.body.updates;
console.log(qty);
try { 
  Cart.update(ProductID, qty);
  res.redirect('/cart')
} catch (error) {
  throw new Error(error);
}
  });
module.exports = userRouter;