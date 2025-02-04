const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 🔹 Import koneksi database
const db = require("./config/db");

// 🔹 Import routes
const authRoutes = require("./routes/userRoutes"); // Ensure correct path
const questionRoutes = require("./routes/questionRoutes"); // Ensure correct path
const quizRoutes = require("./routes/quizRoutes"); // Ensure correct path

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; // Provide a default port

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quizzes", quizRoutes);

// 🔹 Tes koneksi database
db.promise().query("SELECT 1")
    .then(() => console.log("✅ Database Connected!"))
    .catch((err) => console.error("❌ Database Connection Failed:", err));

// 🔹 Jalankan server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
