document.getElementById('checkForm').onsubmit = function(e){
    let passwd = document.getElementById('passwd').value;
    let confPasswd = document.getElementById('passwdConf').value;
    
    let  chek = document.getElementById('agree').checked;

    let age = document.getElementById('age').value;

    if(passwd != confPasswd){
        window.alert('Password do not match');
        document.getElementById('toRed1').style.color = 'red';
        document.getElementById('toRed2').style.color = 'red';
        
        e.preventDefault();
    }

    if(chek !== true){
        window.alert('You must agree to the terms.');
        document.getElementById('check').style.color = 'red'
        
        e.preventDefault();
    }

    if(age < 10){
        window.alert("You can't register bucz your age.");
        e.preventDefault();
    }
    
}

function dispAge(){
    let getAge = document.getElementById('age').value;
    document.getElementById('displayAge').innerHTML = getAge;
}