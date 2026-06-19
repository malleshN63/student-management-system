
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const XLSX = require("xlsx");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Student Management System Server Running");
});

app.post("/add-student", (req, res) => {

    const { name, email, course } = req.body;

    const checkSql =
        "SELECT * FROM students WHERE email = ?";

    db.query(checkSql, [email], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Error checking email");
        }

        if (results.length > 0) {
            return res.send("Email already exists");
        }

        const insertSql =
            "INSERT INTO students (name, email, course) VALUES (?, ?, ?)";

        db.query(
            insertSql,
            [name, email, course],
            (err, result) => {

                if (err) {
                    console.log(err);
                    res.status(500).send("Error saving student");
                } else {
                    res.send("Student added successfully");
                }

            }
        );

    });

});

app.get("/students", (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            res.status(500).send("Error fetching students");
        } else {
            res.json(results);
        }

    });

});


app.delete("/delete-student/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            res.status(500).send("Error deleting student");
        } else {
            res.send("Student deleted successfully");
        }

    });

});

app.put("/update-student/:id", (req, res) => {

    const id = req.params.id;

    const { name, email, course } = req.body;

    const sql =
        "UPDATE students SET name=?, email=?, course=? WHERE id=?";

    db.query(
        sql,
        [name, email, course, id],
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send("Error updating student");
            } else {
                res.send("Student updated successfully");
            }

        }
    );

});

app.get("/export-excel", (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Error exporting data");
        }

        const workbook = XLSX.utils.book_new();

        const worksheet =
            XLSX.utils.json_to_sheet(results);

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Students"
        );

        const filePath = "students.xlsx";

        XLSX.writeFile(workbook, filePath);

        res.download(filePath);

    });

});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});