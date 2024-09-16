const express = require("express");
const mysql = require("mysql");
const cors = require("cors"); // Allowing CORS for fetch requests

const app = express();
const port = 1111;

// Allow CORS (for frontend to access backend)
app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Use your MySQL password here
    database: "sensor",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.stack);
        return;
    }
    console.log("Connected to MySQL as id " + connection.threadId);
});

// Fetch data from MySQL
app.get("/data", (req, res) => {
    const query = "SELECT * FROM sensor";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.stack);
            res.status(500).send("Error fetching data from database.");
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
