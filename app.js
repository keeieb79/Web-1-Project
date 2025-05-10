const express = require("express");
const path = require('path');
const mysql = require('mysql')

const app = express();
app.use(express.json());

// app.use('views', path.join(__dirname, 'views'));
app.use('/style', express.static(path.join(__dirname, 'public/style')));
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));
app.use('/imgs', express.static(path.join(__dirname, 'public/imgs')));

// connect to our web1Project DB
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'web1Project'
})

// test to add new user using api
// app.post('/user',function(req, res){
//     let user = req.body.username;
//     let passwd = req.body.passwd;
//     // let date 
//     let email = req.body.email;

//     console.log(user + " " + passwd + " " + email);
//     conn.query(`INSERT INTO users(username,passwd,email) VALUES('${user}','${passwd}','${email}')`);
//     res.status(200).send("user added successfully");
// })

// test to delete users
app.delete('/user/:user',function(req, res){
    const { user } = req.params;

    console.log(user + " user deleted successfully.");
    conn.query(`DELETE FROM users WHERE username = '${user}'`);
    
    res.status(200).send("user deleted successfully.");
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,"index.html"));
})

// render login page
app.get('/login',function(req,res) {
    res.sendFile(path.join(__dirname,"login.html"));
})

// render registeration page
app.get('/register',function(req,res) {
    res.sendFile(path.join(__dirname,"register.html"));
})

// get data from client with json format
app.post('/register',function(req,res) {
    let retrivedData = {
        user: req.body.username,
        passwd: req.body.password,
        email: req.body.userEmail,
        age: req.body.ageNum,
        birth: req.body.birthDate
    }

    conn.query(`INSERT INTO users(username,passwd,email, age, birthDate) VALUES('${retrivedData.user}','${retrivedData.passwd}','${retrivedData.email}','${retrivedData.age}',STR_TO_DATE('${retrivedData.birth}',"%Y-%m-%d"))`);

    res.status(200).send("user created successfully.")
    console.log(retrivedData)

})

app.listen(5000, function(){
    console.log('[+] server is running on http://127.0.0.1:5000');
})