
let constructProdectTableList = (products) => {
    if(! Array.isArray(products)) {
        return;
    }
    let tableBody_products = document.getElementById('products_list_parent');
    products.forEach(productObj => {
        tableBody_products.appendChild(constructProdectTableItem(productObj));
    });
};

let constructProdectTableItem = (productObj) => {
    let productDetails = ['image', 'product_name', 'sku', 'offer_price', 'count_in_inventory', 'status'];
    let tr_product = document.createElement('tr');
    for(let i = -1; i < productDetails.length; i++) {
        let propertyName = productDetails[i];
        let td_property = document.createElement('td');
        
        if(i == -1) {
            let input_checkbox = document.createElement('input');
            input_checkbox.setAttribute('type', 'checkbox');
            input_checkbox.setAttribute('name', 'prod-item');
            td_property.appendChild(input_checkbox);
            tr_product.appendChild(td_property);
            continue;
        }
        
        if(propertyName === 'image' && productObj.hasOwnProperty(propertyName)) {
            let imageUrl = productObj[propertyName];
            let span_wrap = document.createElement('span');
            span_wrap.setAttribute('class', 'admin-list-img');
            let img_prodImage = document.createElement('src', '' + imageUrl);
            img_prodImage.setAttribute('alt', 'product image');
            span_wrap.appendChild(img_prodImage);
            td_property.appendChild(span_wrap);
        } else if(propertyName === 'product_name' && productObj.hasOwnProperty(propertyName)) {
            let a_wrap = document.createElement('a');
            a_wrap.setAttribute('href', '/admin/editproduct?id=' + productObj.sku);
            a_wrap.innerText = productObj[propertyName];
            td_property.appendChild(a_wrap);
        } else {
            if(productObj.hasOwnProperty(propertyName)) {
                if(propertyName === 'status') {
                    if(productObj[propertyName].trim().toLowerCase() === 'active') {
                        td_property.setAttribute('class', 'color-green');
                    } else if(productObj[propertyName].trim().toLowerCase() === 'inactive') {
                        td_property.setAttribute('class', 'color-red');
                    }
                } else if(propertyName === 'offer_price') {
                    td_property.innerHTML += '$';
                }
            }
            let value = productObj[propertyName];
            td_property.innerText += value != undefined && value != null ? value: '-';
        }
        tr_product.appendChild(td_property);
    }
    return tr_product;
};