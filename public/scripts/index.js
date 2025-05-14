function chaguser(){
    if(window.sessionStorage.getItem['user'] !== null){
        let username = document.getElementById('loginStatus').innerHTML = "Welcome " + window.sessionStorage.getItem['user'];
    }else{
        return;
    }
}