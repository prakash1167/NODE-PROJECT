/*let addProduct = (e) => {
    e.preventDefault();
    // take the form data
    let input_productName = document.getElementById('product_name');
    let input_sku = document.getElementById('sku');
    let input_offerPrice = document.getElementById('offer_price');
     let radio_statusActive = document.getElementById('status_active');
    let textarea_description = document.getElementById('description');
    let status = radio_statusActive.checked ? 'active' : 'inactive';
    let image= document.getElementById('productimage');
    let formData = {
        product_name: input_productName.value,
        sku: input_sku.value,
        offer_price: input_offerPrice.value,
        status: status,
        description: textarea_description.value,
        image:image.files[0].name
    };
    
    // add to db
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            var resObj = JSON.parse(xhr.responseText);
            consol.log(resObj);
        }
    };
    xhr.open('PUT', '/admin/editproduct');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(formData));
};*/