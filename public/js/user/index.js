// get banner
let getBanners = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            alert(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('GET', '/banners');
    xhr.send();
};

// get best seller products
let getBestSellerProducts = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            alert(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('GET', '/bestsellerproducts');
    xhr.send();
};

// get new arrivals
let getNewArrivals = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            alert(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('GET', '/newarrivals');
    xhr.send();
};

getBanners();
getBestSellerProducts();
getNewArrivals();
