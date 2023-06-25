let cart = null;

module.exports = class Cart {

    static save(Product) {

        if (cart === null) {
            cart = { products: [], totalPrice: 0,totalafterDiscount:0 };
        }
let qty=Number(Product.qty);
console.log(Product.qty);
        const existingProductIndex = cart.products.findIndex(p => p.id == Product.id); // to check product is existing in cart
        console.log(existingProductIndex);
        if (existingProductIndex >= 0) { // exist in cart already
            const oldProduct = cart.products[existingProductIndex];
            oldProduct.qty +=Number(Product.qty)  ;
            console.log(oldProduct.qty)
        } else { //not exist  
            cart.products.push(Product);      
        }     
       cart.totalPrice  +=Number (Product.offer_price) * Number(Product.qty) ;      
        console.log(cart);
    }
    static getCart() {
        
        return cart;
    }
    static applycoupon(products,percentage){
        let z=[];
   let y=[];
  // console.log(productsto);
      for(let i=0;i<cart.products.length;i++){
        //let productsto=products;
       const existingProductIndex = products.findIndex(Product => Product._id == cart.products[i]._id); // to check product is existing in cart
        console.log(existingProductIndex);
        if (existingProductIndex >= 0) { // exist in cart already
            const oldProduct = products[existingProductIndex];
           console.log(oldProduct);
        } else { //not exist
           y.push(cart.products[i]);     
        } 
       let query={offer_price:cart.products[i].offer_price}
        //const List=  products.find(query);
    // z.push(List[0]);
      console.log(query);
      }console.log(y);
        cart.products.Product
       // const existingProductIndex = cart.totalPrice.findIndex(p => p.totalPrice == cart.totalPrice)
         cart.totalafterDiscount = Number((cart.totalPrice * percentage)/100).toFixed(2);
   console.log(cart.totalafterDiscount)
    }
static update(productID,qty) {
    const isExisting = cart.products.findIndex(p => p.id == productID);;

     if (isExisting >= 0) {
            const updateProduct = cart.products[isExisting];
            cart.totalPrice -= Number(updateProduct.offer_price) * Number(updateProduct.qty);
            updateProduct.qty=qty;
            cart.totalPrice+=Number(updateProduct.offer_price) * Number(updateProduct.qty)
            
        }
}
    static delete(productId) {
        const isExisting = cart.products.findIndex(p => p.id == productId);
        if (isExisting >= 0) {
            const deletedProduct = cart.products[isExisting];
            cart.totalPrice -= Number(deletedProduct.offer_price) * Number(deletedProduct.qty);
            cart.products.splice(isExisting, 1);
        }
    }
    static delete() {
        cart.products.splice(cart.products);
return cart;
    }

}