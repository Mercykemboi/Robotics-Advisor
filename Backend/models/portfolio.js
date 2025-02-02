const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, 
  riskTolerance: { type: String, enum: ["Low", "Medium", "High"], required: true },
  assets: [
    {
      assetName: { type: String, required: true },
      assetType: { type: String, required: true },
      allocation: { type: Number, required: true }, 
      currentValue: { type: Number, default: 0 }, 
    },
  ],
  totalValue: { type: Number, default: 0 },  // ✅ Store total portfolio value
  performanceHistory: [
    {
      date: { type: Date, default: Date.now },
      value: { type: Number, required: true },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
module.exports = Portfolio;
