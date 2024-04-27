const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "booking",
});
//        /add_user
//  CREATE BOOKING
app.post("/add_user", (req, res) => {
  sql =
    "INSERT INTO user_details (`name`,`email`,`age`,`gender`)VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student added successfully" });
  });
});

//       /students
//  DISPLAY ALL BOOKINGS
app.get("/booking", (req, res) => {
  const sql = "SELECT * FROM user_details WHERE `Deleted`='Active'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

//
//
//       /get_student
//  DISPLAY BOOKING DETAILS
app.get("/get_booking/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM user_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
//
//
//
//   EDIT BOOKING DETAILS - ADMIN ONLY
app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE user_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];
  console.log(values);
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});
//
//
// DELETE BOOKING /UPDATE 1 VALUE I-O
app.post("/delete_user/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE user_details SET `Deleted`='deleted' WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json({ success: "User marked as deleted successfully" });
  });
});
//
//
//
// LOG IN USER
app.post("/check_user", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user_login WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (result.length > 0) {
      // User exists and password matches
      return res.json({ success: true, message: "Login successful" });
    } else {
      // No user found with the provided email and password
      return res.json({ success: false, message: "Invalid email or password" });
    }
  });
});

//
//
//
app.listen(port, () => {
  console.log("listening");
});
