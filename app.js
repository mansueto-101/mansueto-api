import express from "express";
import cors from "cors";
import { client } from "./database.js";

const app = express();

app.use(express.json()); 
app.use(cors());

// Root home route
app.get("/", (req, res) => {
  res.json({ message: "Backend is connected to Turso!" });
});

app.post("/user", async (req, res) => {
  const { 
    user_login, 
    user_pass, 
    fname, 
    lname, 
    gender, 
    user_level, 
    branch_cd, 
    email, 
    user_activation_key, 
    isActive 
  } = req.body; 

  try {
    await client.execute({
      sql: `INSERT INTO users (user_login, user_pass, fname, lname, gender, user_level, branch_cd, email, user_activation_key, isActive) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [user_login, user_pass, fname, lname, gender, user_level, branch_cd, email, user_activation_key, isActive],
    });
    res.json({ message: "User added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/user", async (req, res) => {
  try {
    const result = await client.execute("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.execute({
      sql: "SELECT * FROM users WHERE user_id = ?",
      args: [id],
    });
    res.json(result.rows[0] || { message: "User not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { 
    user_login, 
    user_pass, 
    fname, 
    lname, 
    gender, 
    user_level, 
    branch_cd, 
    email, 
    user_activation_key, 
    isActive 
  } = req.body;

  try {
    await client.execute({
      sql: `UPDATE users 
            SET user_login = ?, user_pass = ?, fname = ?, lname = ?, gender = ?, user_level = ?, branch_cd = ?, email = ?, user_activation_key = ?, isActive = ? 
            WHERE user_id = ?`,
      args: [user_login, user_pass, fname, lname, gender, user_level, branch_cd, email, user_activation_key, isActive, id],
    });
    res.json({ message: "User updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await client.execute({
      sql: "DELETE FROM users WHERE user_id = ?",
      args: [id],
    });
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running and listening on http://localhost:${PORT}`);
});

export default app;