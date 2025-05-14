async function search(){
    let input = document.getElementById('searchText').value;
    let table = document.getElementById('tableBody');
    table.innerHTML = '';

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
        table.innerHTML = table.innerHTML + `
    <tr>
        <td>not found</td>
        <td>not found</td>
        <td>not found</td>
        <td>not found</td>
    </tr>
    `;
    }else{
        table.innerHTML = table.innerHTML + `
        <tr>
            <td>${result[0].productName}</td>
            <td>${result[0].descriptions}</td>
            <td><img src="${result[0].imagePath}" width="150px" alt=""></td>
            <td>${result[0].price} SAR</td>
        </tr>`;
        // Obsidian SIEM
    }
}

