require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("../Backend/config/db");
const authRoutes = require("../Backend/routes/auth");
const financialGoalsRoutes = require("../Backend/routes/financialgoals"); 
const portfolioRoutes = require("../Backend/routes/portfolio");
const marketDataRoutes = require("../Backend/routes/marketData");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");  // ✅ Required for Socket.IO
const { Server } = require("socket.io");  // ✅ Import Socket.IO
const notificationRoutes = require("../Backend/routes/notifications");
const admin = require("../Backend/routes/admin")

const app = express();
const server = http.createServer(app); // ✅ Create HTTP Server

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Change if using a different frontend URL
    credentials: true,
  },
});

// Store notifications
let notifications = [];

// ✅ Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("🔗 A user connected");

  // Send existing notifications on connection
  socket.emit("notifications", notifications);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// ✅ Function to trigger and send notifications
const sendNotification = (message) => {
  const notification = { id: Date.now(), message, timestamp: new Date() };
  notifications.push(notification);

  // Emit notification to all connected clients
  io.emit("notification", notification);
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3001", credentials: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/financial-goals", financialGoalsRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/market", marketDataRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", admin);

// ✅ Export the `sendNotification` function for use in other files
module.exports = { sendNotification };

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
