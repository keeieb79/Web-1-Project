function getNumItem(){
    let num = window.localStorage.getItem('total');
    if (num == undefined) {
        num = 'no item';
    } else if(num > 0){
        document.getElementById('total').innerHTML = num;
    }
}

function conf(){
    let cardMethod = document.querySelector('input[name=cart]:checked').value;

    let total = window.localStorage.getItem('total');
    
    Swal.fire({
        title: "Are you sure?",
        text: "total order " + total + " using " + cardMethod + " sure?",
        // icon: "Success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Pay"
    }).then((result) => {
        if (result.isConfirmed) {
            sendOrder();
        }
    });
}

async function sendOrder(){
    let data = {
        customerName: window.localStorage.getItem('username'),
        total: window.localStorage.getItem('total')
    }

    let send = await fetch('http://127.0.0.1:5000/cart',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(send.ok){
        window.alert('Your order confirmed.');
        window.location.replace('/')
    }else{
        window.alert('Error.')
    }

};