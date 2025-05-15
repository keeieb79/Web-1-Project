function checkUser() {
    if (window.localStorage.getItem('username') != 'admin') {
        window.location.replace('/');
    } else {
        getItems();
        return;
    }
}

// document.getElementById('insertTable').onload = function(e){
//     e.preventDefault()
// }
let items = [];

async function getItems() {
    let tbody = document.getElementById('insertTable');
    tbody.innerHTML = '';

    let data = await fetch('/admin', {
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
                <button type="button" class="btn btn-primary" onclick='updatePopUp("${i}")'>Update</button>
                <button type="button" class="btn btn-danger" onclick='del("${recv[i].productId}")'>Delete</button>
            </td>
        </tr>
        `;
        items.push(recv[i])
    }
}

async function del(num) {
    let send = await fetch('/admin/' + num, {
        method: 'DELETE'
    })

    let data = await send.json();

    if (!send.ok) {
        window.alert('Error');
        return;
    }

    if (data.status) {
        getItems();
        window.alert('item deleted');
    }

}

async function updatePopUp(id) {

    const { value: formValues } = await Swal.fire({
        title: "Update items",
        html: `
            <input id="swal-input2" class="swal2-input" value="${items[id].productName}">
            <input id="swal-input3" class="swal2-input" value="${items[id].descriptions}">
            <input id="swal-input4" class="swal2-input" value="${items[id].imagePath}">
            <input id="swal-input5" class="swal2-input" value="${items[id].price}">
        `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById("swal-input2").value,
                document.getElementById("swal-input3").value,
                document.getElementById("swal-input4").value,
                document.getElementById("swal-input5").value,
            ];
        }
    });
    if (formValues) {

        update(
            items[id].productId,
            document.getElementById("swal-input2").value,
            document.getElementById("swal-input3").value,
            document.getElementById("swal-input4").value,
            document.getElementById("swal-input5").value);
        window.location.reload();
        // Swal.fire(JSON.stringify(formValues));

    }
}

async function update(id, name, desc, path, price) {
    let data = {
        id: id,
        name: name,
        description: desc,
        imgPath: path,
        price: price
    }

    let send = await fetch('/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!send.ok) {
        console.log('Error in send')
        return;
    }
    
    let recv = await send.json();

    if (recv.status) {
        window.alert('Product updated');
        window.location.reload();
        return;
    } else {
        window.alert('Error in update, Try again');
        return;
    }

    // else{
    //     window.alert('Product updated');
    //     window.location.reload();
    // }

}

async function addPopUp(){
    const { value: formValues } = await Swal.fire({
        title: "Add item",
        html: `
            Name:<input id="swal-input2" class="swal2-input">
            desc:<input id="swal-input3" class="swal2-input">
            ImgPath:<input id="swal-input4" class="swal2-input">
            Price:<input id="swal-input5" class="swal2-input">
        `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById("swal-input2").value,
                document.getElementById("swal-input3").value,
                document.getElementById("swal-input4").value,
                document.getElementById("swal-input5").value,
            ];
        }
    });
    if (formValues) {

        add(
            document.getElementById("swal-input2").value,
            document.getElementById("swal-input3").value,
            document.getElementById("swal-input4").value,
            document.getElementById("swal-input5").value
        );
        
            window.location.reload();
        // Swal.fire(JSON.stringify(formValues));
    }

}

async function add(name, desc, imgPath, price) {
    let data = {
        name: name,
        description: desc,
        imgPath: imgPath,
        price: price
    }

    let send = await fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!send.ok) {
        console.log('Error in send')
        return;
    }
    
    let recv = await send.json();

    if (recv.status) {
        window.alert('Product add');
        window.location.reload();
        return;
    } else {
        window.alert('Error in add, Try again');
        return;
    }
}