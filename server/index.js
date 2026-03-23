const express = require("express");
const pool = require("./db");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true // if using cookies later
}));


// Test route
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Server working 🚀",
            time: result.rows[0],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        console.log("Processing signup for:", email);
        // Hash the password for security (professional practice)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("Password hashed.");

        // Insert into database
        const newDbUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        );
        console.log("User inserted:", newDbUser.rows[0].id);


        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newDbUser.rows[0].id,
                username: newDbUser.rows[0].username,
                email: newDbUser.rows[0].email
            }
        });
    } catch (err) {
        console.error(err.message);
        // Handle duplicate email/username if unique constraints exist
        if (err.code === '23505') {
            return res.status(409).json({ error: "Username or email already exists" });
        }
        res.status(500).json({ error: "Server error" });
    }
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        // Find user by email
        const userResult = await pool.query(
            "SELECT id, password FROM users WHERE email = $1",
            [email]
        );
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const user = userResult.rows[0];
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        // Success: send user id
        res.json({ id: user.id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/todos", async (req, res) => {
    const { description, userId } = req.body;
    if (!description || !userId) {
        return res.status(400).json({ error: "Description and userId are required" });
    }
    try {
        const newTodo = await pool.query(
            "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
            [userId, description]
        );
        res.status(201).json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/todos/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const todos = await pool.query(
            "SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        );
        res.json(todos.rows);
    } catch (err) {
        console.log("error in fetching todos", err.message);
        res.status(500).json({ error: "Server error" });
    }
});
app.delete("/todos/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query(
            "DELETE FROM todos WHERE id = $1",
            [id]
        );
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        console.log("error in deleting todo", err.message);
        res.status(500).json({ error: "Server error" });
    }
}); 

app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});


