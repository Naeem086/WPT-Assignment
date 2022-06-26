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
    connectdb.query('insert into resource values (?,?,?)', [req.query.resno, req.query.resname, req.query.resstats], (err, res1) => {
        if (err) {
            console.log("Insertion Failed...!");
        } else {
            if (res1.affectedRows == 0) {
                res.send(false);

            } else {
                console.log("Details inserted");
                res.send(true);
            }
        }
    });
});

app.get('/update', (req, res) => {
    console.log("Update Failed...!");
    connectdb.query('update resource set name=?, status=? where no=?', [req.query.resname, req.query.resstats, req.query.resno], (err, res1) => {
        if (err) {
        } else {
            if (res1.affectedRows == 0) {
                res.send(false);
            } else {
                console.log("Details updated");
                res.send(true);
            }
        }
    });
});

app.get('/select', (req, res) => {
    connectdb.query('select * from resource where itemno = ?', [req.query.resno], (err, res1) => {
        if (err) {
            console.log("Failed..!");
        } else {
            if (res1.length > 0) {
                res.send(true);
            } else {
                res.send(false);
            }
        }
    });
});

app.listen(850, () => {
    console.log("Server listening on port 850...");
});