require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("../Backend/config/db");
const authRoutes = require("../Backend/routes/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Adjust based on frontend

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
