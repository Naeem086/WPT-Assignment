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

app.get('/getarea', (req, res) => {
    contact.query('select * from area where pin = ?', [req.query.pincode], (err, res1) => {
        if (err) {
            console.log("Error....!!!");
        } else {
            if (res1.length > 0) {
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