let cartItems = [];
let total = 0;

async function search(){
    let input = document.getElementById('searchText').value;
    let quant = document.getElementById('quantity').value;

    let jsonData = {
        search: input
    }

    let data = await fetch('http://127.0.0.1:5000/search',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
        
    let result = await data.json(); // Dark Sentinel EDR
    
    if (result === "not found") {
        window.alert('Item not found or the name is incorrect.')
    }else{
        let items = {
            name: result[0].productName,
            price: result[0].price,
            quantity: quant
        }
        
        cartItems.push(items);
        display();
    }
}

function display() {
    let table = document.getElementById('tableBody');
    
    table.innerHTML = '';

    for (var i = 0; i < cartItems.length; i++) {
        table.innerHTML = table.innerHTML + `
        <tr>
            <td>${cartItems[i].name}</td>
            <td>${cartItems[i].price} SAR</td>
            <td>${cartItems[i].quantity}</td>
            <td> <button id='delButton' onclick="deleted('${cartItems[i].name}')">Delete</button> </td>

        </tr>`;
    }

    for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].price * cartItems[i].quantity;
        
    }
    
    document.getElementById("tableBody").innerHTML = table.innerHTML;
    document.getElementById('finalTotal').innerHTML = `
    <tr>
        <td colspan="4">Total: ${total}</td>
    </tr>
    `
}

function deleted(name){
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name == name) {
            cartItems.splice(i, 1);
        }
    }
    display();
}

async function buy(){
    window.localStorage.clear();
    
    if(cartItems.length == 0){
        window.alert('no item selected.')
    }else{
        window.localStorage.setItem('total', total);
        window.localStorage.setItem('itemNum', cartItems.length);
    
        Swal.fire({
            title: "Thanks",
            icon: "success",
            timer: 2000
        });
    }
}
