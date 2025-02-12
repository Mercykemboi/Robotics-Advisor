const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { protect, authorizeRoles} = require("../middleware/middleware");
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password"); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

  

// ✅ UPDATE User Role (Promote/Demote)
router.put("/users/:id", async (req, res) => {
  try {
    const { role } = req.body;
    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/users/:id", async (req, res) => {
    try {
      console.log("📌 Deleting User ID:", req.params.id);
      
      const user = await User.findByIdAndDelete(req.params.id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("✅ User deleted:", user);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

router.post("/create-admin", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the admin already exists
      const existingAdmin = await User.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new User({
        username,
        email,
        password: hashedPassword, 
        role: "admin",
      });
  
      await newAdmin.save();
      res.status(201).json({ message: "New admin created successfully" });
    } catch (error) {
      console.error("Error creating admin:", error);
      res.status(500).json({ message: "Error creating admin" });
    }
  });
  
router.get("/health", async (req, res) => {
    try {
      const health = {
        status: "ok",
        activeUsers: await User.countDocuments(),
        uptime: process.uptime(), // Server uptime
        memoryUsage: process.memoryUsage().rss, // Memory usage
      };
      res.json(health);
    } catch (error) {
      res.status(500).json({ message: "Error checking server health" });
    }
  });

router.get("/user-growth", async (req, res) => {
    try {
      const date30DaysAgo = new Date();
      date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
      
      const newUsers = await User.countDocuments({
        createdAt: { $gte: date30DaysAgo },
      });
      
      res.json({ newUsers });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user growth" });
    }
  });

router.get("/performance",  async (req, res) => {
    try {
      const performanceData = {
        cpuUsage: process.cpuUsage(),
        memoryUsage: process.memoryUsage(),
        requestStats: { 
          totalRequests: 1000,
          failedRequests: 5
        },
      };
      res.json(performanceData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching system performance" });
    }
  });

router.put("/users/:id/status", async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.active = active;
      await user.save();
  
      const status = active ? "activated" : "deactivated";
      res.json({ message: `User successfully ${status}` });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  
  
  

module.exports = router;
