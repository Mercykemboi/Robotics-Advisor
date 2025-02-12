const express = require("express");
const Notification = require("../models/notifications");
const { authProfile } = require("../middleware/middleware");

const router = express.Router();

// ✅ Get User Notifications
router.get("/", authProfile, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Mark Notifications as Read
router.put("/:id/read", authProfile, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Clear All Notifications
router.delete("/", authProfile, async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user.id });
    res.json({ message: "All notifications cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
