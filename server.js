const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();
const cors = require('cors');
const crypto = require('crypto');
const e = require('express');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
db.query('SELECT 1', (err, results) => {
    if (err) console.error('Error running query:', err);
    else console.log('Database is working');
});

const store = new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT 
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

app.use(session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, 
        secure: false,
        sameSite: "lax"
    }
}));

app.use(express.static(path.join(__dirname, "docs")));




////////////////////////// REUSABLE FUNCTIONS //////////////////////////
function checkAdmin(req, res, next){
    if(req.body.code == process.env.ADMIN_CODE){
        next();
    } else {
        return res.json({ message: 'unauth' });
    }
}





////////////////////////// APIS ROUTES //////////////////////////
app.post("/api/verify", checkAdmin, (req, res) => {
    return res.json({ message: 'success' });
});

app.post("/api/post-blog", (req, res) => {
    let { title, image, body } = req.body;

    body = body.replace(/\n/g, "<br><br>");

    let boldIdx = 2;
    let imgIdx = 2;
    for(let i = 0; i < body.length; i++){
        let character = body[i];
        if(character == "*" && body[i + 1] == "*" && body[i + 2] == "*"){
            if(imgIdx % 2 == 0){
                body = body.slice(0, i) + "<div class='post-body-img'><img src='" + body.slice(i + 3);
            } else {
                body = body.slice(0, i) + "' /></div>" + body.slice(i + 3);
            }
            imgIdx++;
        } else if(character == "*" && body[i + 1] == "*"){
            if(boldIdx % 2 == 0){
                body = body.slice(0, i) + "<b>" + body.slice(i + 2);
            } else {
                body = body.slice(0, i) + "</b>" + body.slice(i + 2);
            }
            boldIdx++;
        }
    }
    
    db.query("insert into blogs (title, image, body) values (?, ?, ?)", [title, image, body], (err, result) => {
        if(err){
            console.error(err);
        }

        return res.json({ message: 'success' });
    });
});

app.get("/api/get-blogs", (req, res) => {
    db.query("select * from blogs", (err, result) => {
        if(err){
            console.error(err);
        }
    
        return res.json({ blogs: result });
    });
});






app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});