const express = require('express');
const app = express();
const mysql = require('mysql2');
const contact = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'wpt',
    portno: 3306
});

app.use(express.static('staticfolder'));

app.get('/getdetails', (req, res) => {
    contact.query('select * from account where accno = ?', [req.query.accountno], (err, ress) => {
        if (err) {
            console.log("Error....!!!");
        } else {
            if (ress.length > 0) {
                res.send(res1[0]);
            } else {
                res.send(true);
            }
        }
    });
});

app.listen(900, () => {
    console.log("Server listening on port 900..!");
});