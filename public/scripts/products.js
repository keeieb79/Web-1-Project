{/* <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr> */}

async function insertData(){
    let table = document.getElementById('tableBody');

    let data = await fetch('http://127.0.0.1:5000/products',{
        method: 'POST'
    });

    if(data.ok){
        let result = await data.json();
    
        for(let i = 0; i <= result.length; i++){
            table.innerHTML = table.innerHTML + `
            <tr>
                <td>${result[i].productName}</td>
                <td>${result[i].descriptions}</td>
                <td><img src="${result[i].imagePath}" width="150px" alt=""></td>
                <td>${result[i].price} SAR</td>
            </tr>
            `;
        }
        return;
    }else{
        let result = await data.text();
        alert('not found. ' + result)
    }
}