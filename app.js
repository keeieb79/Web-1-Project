const express = require("express");
const session = require("express-session");
const path = require('path');
const mysql = require('mysql');
var cors = require('cors')


const app = express();

app.use(cors())
app.use(express.json());

// convert the request into javascript object
app.use(express.urlencoded({ extended: false }));

// run your code with nodemon
// npm run start

// app.use('views', path.join(__dirname, 'views'));
app.use('/style', express.static(path.join(__dirname, 'public/style')));
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));
app.use('/imgs', express.static(path.join(__dirname, 'public/imgs')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));
app.use('/vid', express.static(path.join(__dirname, 'public/vid')));

// connect to our web1Project DB
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'web1Project'
})

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.get('/register',function(req,res) {
    res.sendFile(__dirname + "/register.html");
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

    conn.query("SELECT username FROM users WHERE username = '"+ retrivedData.user +"'",function(err,result){
        if(err){
            console.error(err);
        }
        else if(result.length > 0 && result[0].username == retrivedData.user){
            res.json({status: false});
            console.log(result);
        }else{
            conn.query(`INSERT INTO users(username,passwd,email, age, birthDate) VALUES('${retrivedData.user}','${retrivedData.passwd}','${retrivedData.email}','${retrivedData.age}',STR_TO_DATE('${retrivedData.birth}',"%Y-%m-%d"))`,function(err,result){
                if(err){
                    console.error(err);
                }else{
                    res.json({status: true});
                    console.log(retrivedData)
                }
            });
        }
    });

})

// login section. done;
app.get('/login',function(req,res){
    res.sendFile(__dirname + '/login.html')
})

app.post('/login',function(req,res){
    let data = {
        username: req.body.username,
        password: req.body.password
    }

    conn.query(
        "SELECT username, passwd FROM users WHERE username = ? AND passwd = ?",
        [data.username, data.password],
        function(err, result) {
          if (err) {
            res.status(400).send("DB Error " + err);
            return;
        
        } else if (result.length >= 1 && result[0].username === data.username) {
            
            res.json({success: true, username: result[0].username})
            return;
        } else {
            res.json({success: false, massage: 'user or password incorrct'});
            return;
          }
        }
      );
})

app.get('/products',function(req,res){
    res.sendFile(__dirname + '/products.html');
});

app.post('/products',function(req,res){
    conn.query('SELECT * FROM products', (err, result) => {
        if (err) {
            console.log(err);      
        }else{
            res.send(result).status(200);
            console.log(result);
        }
    })
});

app.get('/search',function(req,res){
    res.sendFile(__dirname + '/search.html');
});

app.post('/search', function(req, res){
    let data = {
        search: req.body.search
    }

    conn.query(
        "SELECT * FROM products WHERE productName = ?",[data.search],
        function(err, result) {
          if (err) {
            res.status(400).send("DB Error " + err);
            return;
        } else if (result.length >= 1) {
            res.json(result);
            console.log(result);
            return;
        } else {
            res.json("{'search': 'not found'}").end();
            console.log(result);
            return;
          }
        }
      );
})

app.get('/buy',function(req,res){
    res.sendFile(__dirname + '/buy.html');
});

app.get('/cart',function(req,res){
    res.sendFile(__dirname + '/cart.html');
});
app.post('/cart',function(req,res){
    let data = {
        customNam: req.body.customerName,
        total: req.body.total
    }

    conn.query(
        "INSERT INTO orders(custname, total) VALUES(?, ?);",[data.customNam, data.total],
        function(err,results){
            if(err){
                console.error(err);
            }else{
                console.log(results);
                res.json({status: true}); // id: results.id
            }
        }
    );
});

app.get('/admin',function(req,res){
    res.sendFile(__dirname + '/admin.html');
});

app.post('/admin', function(req, res){
    conn.query('SELECT * FROM products',function(err,result){
        if (err) {
            console.error(err);
        }else{
            res.json(result);
        }
    })

});

app.delete('/admin/:id',function(req,res){
    let id = req.params.id;

    conn.query('DELETE FROM products WHERE productId = ?', [id],
        function(err,result){
            if (err) {
                console.error(err);
            }else{
                res.json({status: true})
            }
        }
    )

    console.log(id);

});

app.listen(5000, function(){
    console.log('[+] server is running on http://127.0.0.1:5000');
})