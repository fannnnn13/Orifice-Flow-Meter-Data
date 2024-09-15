const express = require('express');
const app = express();
const port = 1111;

// Koneksi ke database
// (Contoh saja, pastikan Anda sudah mengonfigurasi koneksi database MySQL)
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sensor'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('/data', (req, res) => {
    connection.query('SELECT * FROM sensor', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send('Error fetching data from database.');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://127.0.0.1:${port}`);
});
