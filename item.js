const express = require('express');
const app = express();
const mysql = require('mysql2');
const connectdb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'wpt',
    portno: 3306
});

app.use(express.static('staticfolder'));

app.get('/insert', (req, res) => {
    connectdb.query('insert into item values (?,?,?,?)', [req.query.itemno, req.query.itemname, req.query.itemprice, req.query.itemcategory], (err, res1) => {
        if (err) {
            console.log("Insertion Failed...!");
        } else {
            if (res1.affectedRows == 0) {
                res.send(false);

            } else {
                console.log("Item details inserted");
                res.send(true);
            }
        }
    });
});

app.get('/update', (req, res) => {
    console.log("Update Failed...!");
    connectdb.query('update item set itemname=?, price=?, category=? where itemno=?', [req.query.itemname, req.query.itemprice, req.query.itemcategory, req.query.itemno], (err, res1) => {
        if (err) {
        } else {
            if (res1.affectedRows == 0) {
                res.send(false);
            } else {
                console.log("Item details updated");
                res.send(true);
            }
        }
    });
});

app.get('/select', (req, res) => {
    connectdb.query('select * from item where itemno = ?', [req.query.itemno], (err, res1) => {
        if (err) {
            console.log("Failed..!");
        } else {
            if (res1.length > 0) {
                console.log("Working...!");
                res.send(true);
            } else {
                res.send(false);
            }
        }
    });
});

app.listen(800, () => {
    console.log("Server listening on port 800...");
});