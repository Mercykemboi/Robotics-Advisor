const mongoose = require("mongoose");

const FinancialGoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
});

const FinancialGoal = mongoose.model("FinancialGoal", FinancialGoalSchema);
module.exports = FinancialGoal;
