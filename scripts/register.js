function check(e){
    let passwd = document.getElementById('passwd').value;
    let confPasswd = document.getElementById('passwdConf').value;

    if(passwd !== confPasswd){
        window.alert('Password do not match');
        e.preventDefault();
        window.location.reload();
    }

    let passwdLable = document.getElementsByClassName('toRed');
    

}

function dispAge(){
    let getAge = document.getElementById('age').value;
    document.getElementById('displayAge').innerHTML = getAge;
}