/*let addOrder = (e) => {
    
    var  total=document.getElementById('select-all');
    

    var order_no = document.getElementById('select-all');
    var fulfillment_status = radio_statusActive.checked ? 'yes' : 'no'; 
    var  date=document.getElementById('select-all');
    var   payment_address=document.getElementById(' select-all');
    var radio_statusActive= document.getElementById('select-all');
   
    var reqPayload = {
        order_no:order_no.value,
    date: date.value,
    payment_address:  payment_address.value,
    fulfillment_status: fulfillment_status.value,
    total: total.value
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            var resObj = JSON.parse(xhr.responseText);
            consol.log(resObj);
        }
    };
    xhr.open('POST', '/admin/orders');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(reqPayload));
};*/