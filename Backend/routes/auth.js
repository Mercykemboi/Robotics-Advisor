const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require("multer");
const { protect, authorizeRoles, authProfile} = require("../middleware/middleware");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
     
    console.log(username,email,password,role);
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ username, email, password: hashedPassword, role });
    await user.save();
   
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
     
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful",
    token,
    username:user.username,
    role:user.role,
    profileImage: user.profileImage ? `http://localhost:5000${user.profileImage}` : null, // ✅ Include image URL
   });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout a user
router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logout successful" });
});

// Protected route (only authenticated users)
router.get("/dashboard", protect, (req, res) => {
  res.json({ message: "Welcome to the dashboard", user: req.user });
});

// Admin-only route
router.get("/admin", protect, authorizeRoles(["admin"]), (req, res) => {
  res.json({ message: "Welcome to the admin panel" });
});


// ✅ Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// // ✅ Fetch User Profile

router.get("/profile", authProfile, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});router.put("/profile", authProfile, upload.single("profileImage"), async (req, res) => {
  try {
    const { username } = req.body;
    const updateFields = {};

    if (username) updateFields.username = username;

    if (req.file) {
      updateFields.profileImage = `/uploads/${req.file.filename}`; // ✅ Save image path
    }

    console.log("📌 Received Username:", username);
    console.log("📌 Received Profile Image:", req.file ? `✅ Image saved as ${updateFields.profileImage}` : "❌ No image uploaded");

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Updated User:", updatedUser);
    res.json({ user: updatedUser });

  } catch (err) {
    console.error("❌ Profile Update Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ✅ Get User Risk Tolerance
router.get("/risk-tolerance", authProfile, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ riskTolerance: user.riskTolerance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update User Risk Tolerance
router.put("/risk-tolerance", authProfile, async (req, res) => {
  try {
    const { riskTolerance } = req.body;
    if (!["Low", "Medium", "High"].includes(riskTolerance)) {
      return res.status(400).json({ message: "Invalid risk tolerance value" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { riskTolerance },
      { new: true }
    );

    res.json({ message: "Risk tolerance updated", riskTolerance: updatedUser.riskTolerance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



module.exports = router;
