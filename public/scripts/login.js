document.getElementById('loginForm').onsubmit = function(e){
    e.preventDefault();
    
    let user = document.getElementById('user').value;
    let passwd = document.getElementById('passwd').value;

    sendInfo(user, passwd);
};

async function sendInfo(user,passwd){
    let data = {
        username: user,
        password: passwd
    }

    let send = await fetch('http://localhost:5000/login',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!send.ok) {
        const errorText = await send.text();
        alert(`Login failed: ${errorText}`);
        
        console.error('Login failed:', errorText);
        return;
    }

    let recv = await send.json();

    if(recv.success){
        localStorage.setItem('username', recv.username);
        window.location.replace('/');
        // window.localStorage.setItem('user', recv);
    }else{
        window.alert('Login faild.');
    }
//     if(recv === "User not found."){
//         window.alert('Wrong username or password or You don\'t have account.');
//         window.location.reload();
//         return;
//     }
}