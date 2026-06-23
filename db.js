console.log("db.js loaded");

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "student_management"
});

connection.connect((err) => {
    if (err) {
        console.log("Database Connection Failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

module.exports = connection;