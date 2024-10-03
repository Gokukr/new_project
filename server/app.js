const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const adminRoutes = require("./routes/adminRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
app.use(express.json()); // Middleware to parse JSON

// Use the routes
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes); // Correct route use
app.use("/trainer", trainerRoutes);
app.use("/user", userRoutes);
app.use("/course", courseRoutes);

module.exports = app; // Export the app instance
