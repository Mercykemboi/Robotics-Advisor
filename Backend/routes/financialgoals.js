const express = require("express");
const FinancialGoal = require("../models/financials");
const { authProfile } = require("../middleware/middleware");

const router = express.Router();

// ✅ Create a New Financial Goal
router.post("/", authProfile, async (req, res) => {
  try {
    const { title, targetAmount, deadline } = req.body;
    const newGoal = new FinancialGoal({
      user: req.user.id,
      title,
      targetAmount,
      deadline,
    });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get All Financial Goals for Logged-in User
router.get("/", authProfile, async (req, res) => {
  try {
    const goals = await FinancialGoal.find({ user: req.user.id });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update a Financial Goal
router.put("/:id", authProfile, async (req, res) => {
  try {
    const { title, targetAmount, currentAmount, deadline } = req.body;
    const updatedGoal = await FinancialGoal.findByIdAndUpdate(
      req.params.id,
      { title, targetAmount, currentAmount, deadline },
      { new: true }
    );

    if (!updatedGoal) return res.status(404).json({ message: "Goal not found" });
    console.log(updatedGoal);
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete a Financial Goal
router.delete("/:id", authProfile, async (req, res) => {
  try {
    await FinancialGoal.findByIdAndDelete(req.params.id);
    res.json({ message: "Financial goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
