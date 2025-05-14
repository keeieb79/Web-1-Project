document.getElementById('loginForm').onsubmit = function(e){
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
        body: data
    })

//     let recv = await send.text();

//     if(recv === "User not found."){
//         window.alert('Wrong username or password or You don\'t have account.');
//         window.location.reload();
//         return;
//     }
}