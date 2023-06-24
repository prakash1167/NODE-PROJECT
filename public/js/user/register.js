var registerUser = (e) => {
    e.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    if(password !== confirmPassword) {
        alert('Please, reenter the same password');
        return;
    }
  


    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            var resObj = JSON.parse(xhr.responseText);
            if(resObj != undefined && resObj.redirectUrl != '') {
                window.location.href = resObj.redirectUrl;
            }
        }
    };
    let userData = {
        useremail: email,
        userpass: password
    };
    xhr.open('POST', '/register');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(userData));
};
