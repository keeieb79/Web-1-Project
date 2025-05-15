function checkUser(){
    if (window.localStorage.getItem('username') != 'admin') {
        window.location.replace('/');
    }else{
        getItems();
        return;
    }
}

// document.getElementById('insertTable').onload = function(e){
//     e.preventDefault()
// }

async function getItems() {
    let tbody = document.getElementById('insertTable');
    let items = [];
    tbody.innerHTML = '';

    let data = await fetch('/admin',{
        method: 'POST'
    })

    let recv = await data.json();
    
    for (let i = 0; i < recv.length; i++) {
        tbody.innerHTML = tbody.innerHTML + `
        <tr>
            <td>${recv[i].productId}</td>
            <td>${recv[i].productName}</td>
            <td>${recv[i].price}</td>
            <td>
                <button type="button" class="btn btn-primary" onclick='${recv[i].productId}'>Detail</button>
                <button type="button" class="btn btn-danger" onclick='del("${recv[i].productId}")'>Delete</button>
            </td>
        </tr>
        `;
        items.push(recv[i])
    }
}

async function del(num){    
    let send = await fetch('/admin/' + num,{
        method: 'DELETE'
    })

    let data = await send.json();

    if (!send.ok) {
        window.alert('Error');
        return;
    }
    
    if(data.status){
        getItems();
        window.alert('item deleted');
    }

}

