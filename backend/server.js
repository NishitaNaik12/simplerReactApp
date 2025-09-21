import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// CREATE
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: "User added", id: result.insertId });
  });
});

// READ
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = "UPDATE users SET name=?, email=? WHERE id=?";
  db.query(sql, [name, email, id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: "User updated" });
  });
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: "User deleted" });
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
