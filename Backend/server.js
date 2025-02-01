require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("../Backend/config/db");
const authRoutes = require("../Backend/routes/auth");
const financialGoalsRoutes = require("../Backend/routes/financialgoals"); 
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // ✅ Allow frontend

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/financial-goals", financialGoalsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
