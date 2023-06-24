let addDiscount = (e) => {
    console.log('clicked');

    // get data
    let input_discount_code = document.getElementById('discount_code');
    let input_discount_value = document.getElementById('discount_value');
    let input_discount_status_enable = document.getElementById('status_enable');
    let intput_discount_appliesto_allproducts = document.getElementById('all_products');
    let input_start_date = document.getElementById('start_date');
    let input_end_date = document.getElementById('end_date');
   let products=intput_discount_appliesto_allproducts.checked ?'all':'specific'
    let status = input_discount_status_enable.checked ? 'active' : 'inactive';
    let reqPayload = {
        code: input_discount_code.value,
        percentage: input_discount_value.value,
        status: status,
        addedproducts:products,
        start_date: input_start_date.value,
        end_date: input_end_date.value
    };

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            let resObj = JSON.parse(xhr.responseText);
        }
    };
    xhr.open('POST', '/admin/discount');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(reqPayload));
};

let constructDiscountTableItem = (discount) => {
    if(discount == undefined || discount == null) {
        return;
    }
    let couponDetails = ["code", "no_of_times_used", "start_date", "end_date", "status"];
    let tr_discount = document.createElement('tr');
    for(let i = -1; i < couponDetails.length; i++) {
        let td_property = document.createElement('td');
        if(i == -1) {
            let input_checkbox = document.createElement('input');
            input_checkbox.setAttribute('type', 'checkbox');
            input_checkbox.setAttribute('name', 'discount-item');
            td_property.appendChild(input_checkbox);
            tr_discount.appendChild(td_property);
            continue;
        }
        if(discount[couponDetails[i]] != undefined && discount[couponDetails[i]] != null) {
            if(couponDetails[i] === 'code') {
                let coupon_code = discount[couponDetails[i]];
                let coupon_desc = discount["description"];
                let a_coupon_code = document.createElement('a');
                a_coupon_code.setAttribute('href', `/admin/editdiscount?id=${coupon_code}`);
                let u_coupon_name = document.createElement('u');
                u_coupon_name.innerText = coupon_code;
                let p_coupon_desc = document.createElement('p');
                p_coupon_desc.innerText = coupon_desc != undefined && coupon_desc != null ? coupon_desc : "No description";
                a_coupon_code.appendChild(u_coupon_name);
                a_coupon_code.appendChild(p_coupon_desc);
                td_property.appendChild(a_coupon_code);
            } else {
                td_property.innerText = discount[couponDetails[i]];
            }
        } else {
            td_property.innerText = '-';
        }
        tr_discount.appendChild(td_property);
    };
    return tr_discount;
};

constructDiscountTableItem();
/*
let valuelist=document.getElementById('');
let listarray=[];
let checkboxes=document.querySelectorAll('.checkbox')
console.log(checkboxes);

for(let checkbox of checkboxes){


    checkbox.addEventListener('click',function(){
        if(this.checked==true){
console.log(this.value);
listarray.push(this.value)
        }else {
            console.log('unchecked')
           listarray=listarray.filter(e=>{e!==this.value})
        }
    })
}*/