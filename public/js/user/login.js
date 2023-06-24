var loginUser = (e) => {
    e.preventDefault();
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                if(res == undefined || res == null) {
                    alert('Something went wrong...');
                    return;
                }
                if(res.isUserNotExists) {
                    alert('User doesn\'t exists');
                    return;
                }
                if(res.redirectUrl != undefined || res.redirectUrl != null) {
                    window.location.href = res.redirectUrl;
                }
            } else {
                alert('Something went wrong...');
            }
        } 
    };
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-type', 'application/json');
    var loginCredObj = {};
    loginCredObj.useremail = document.getElementById('useremail').value;
    loginCredObj.userpass = document.getElementById('userpass').value;
    xhr.send(JSON.stringify(loginCredObj));
};

