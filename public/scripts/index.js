function chaguser(){
    let user = window.localStorage['username'];

    if(user == undefined){
        return;
    }else if(user.length > 0){
        console.log(window.localStorage.getItem('username'));
        document.getElementById('loginText').innerHTML = `<a href="/" onclick="logout()" class="loginStatus">Welcome ${window.localStorage.getItem('username')}, logout</a>`;
        return;
    }else{
        console.log(window.localStorage.getItem('username'));
        return;
    }
}

function logout(){
    window.localStorage.clear();
    window.location.reload();
    return;
}