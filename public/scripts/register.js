document.getElementById('checkForm').onsubmit = function(e){
    e.preventDefault();

    let user = document.getElementById('user').value;

    let passwd = document.getElementById('passwd').value;
    let confPasswd = document.getElementById('passwdConf').value;
    let email = document.getElementById('email').value;

    let age = document.getElementById('age').value;
    let birthDate = document.getElementById('birth').value;
    
    let  chek = document.getElementById('agree').checked;

    if(passwd != confPasswd){
        window.alert('Password do not match');
        document.getElementById('toRed1').style.color = 'red';
        document.getElementById('toRed2').style.color = 'red';
        
        return;
    }

    if(chek !== true){
        window.alert('You must agree to the terms.');
        document.getElementById('check').style.color = 'red'
        
        return;
    }

    if(age < 10){
        window.alert("You can't register bucz your age.");
        return;    
    }

    sendData(user, passwd, email, age, birthDate);
}

async function sendData(user, passwd, email, age, birth){
    let data = {
        username: user,
        password: passwd,
        userEmail: email,
        ageNum: age,
        birthDate: birth
    }

    let req = await fetch('http://127.0.0.1:5000/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!req.ok) {
        window.alert('error occur, try again.');
        return;
    }else{
        let res = await req.json();
    
        if(res == false){
            window.alert('User already exist.');
            window.location.replace('http://localhost:5000/login');
            return;
        }else if(res){
            window.localStorage.setItem('username',data.username);
            // window.localStorage.setItem('password',data.password);
            window.location.replace('/');
        }
    }
}

function dispAge(){
    let getAge = document.getElementById('age').value;
    document.getElementById('displayAge').innerHTML = getAge;
}