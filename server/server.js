require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "your_secret_key"; // Change this to a secure key

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body; // Password stored in plain text
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User registered" });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ message: "User not found" });

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  });
});

app.get("/profile", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    res.json({ message: "Profile accessed", userId: decoded.id, username: decoded.username });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
