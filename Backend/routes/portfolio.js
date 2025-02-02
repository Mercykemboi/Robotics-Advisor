const express = require("express");
const Portfolio = require("../models/portfolio");
const User = require("../models/user");
const { authProfile } = require("../middleware/middleware");

const router = express.Router();

// ✅ Default Asset Allocations Based on Risk
const defaultAllocations = {
  Low: [
    { assetName: "Bonds", assetType: "Fixed Income", allocation: 70 },
    { assetName: "Blue-Chip Stocks", assetType: "Equity", allocation: 20 },
    { assetName: "Gold", assetType: "Commodities", allocation: 10 },
  ],
  Medium: [
    { assetName: "Index Funds", assetType: "Equity", allocation: 50 },
    { assetName: "Corporate Bonds", assetType: "Fixed Income", allocation: 30 },
    { assetName: "Crypto", assetType: "Digital Assets", allocation: 20 },
  ],
  High: [
    { assetName: "Tech Stocks", assetType: "Equity", allocation: 50 },
    { assetName: "Crypto", assetType: "Digital Assets", allocation: 40 },
    { assetName: "Real Estate", assetType: "Alternative", allocation: 10 },
  ],
};

// ✅ Create Portfolio with Automated Asset Allocation
router.post("/", authProfile, async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const riskTolerance = user.riskTolerance || "Medium"; // Default to Medium
    const assets = defaultAllocations[riskTolerance]; // ✅ Assign default assets

    const newPortfolio = new Portfolio({
      user: req.user.id,
      name,
      riskTolerance,
      assets,
    });

    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get User's Portfolios
router.get("/", authProfile, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user.id });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update Asset Allocations in a Portfolio
router.put("/:id/assets", authProfile, async (req, res) => {
    try {
      const { assets } = req.body;
  
      // Ensure total allocation does not exceed 100%
      const totalAllocation = assets.reduce((sum, asset) => sum + asset.allocation, 0);
      if (totalAllocation > 100) {
        return res.status(400).json({ message: "Total allocation cannot exceed 100%." });
      }
  
      const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        req.params.id,
        { assets },
        { new: true }
      );
  
      if (!updatedPortfolio) return res.status(404).json({ message: "Portfolio not found" });
  
      res.json(updatedPortfolio);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

// ✅ Delete Portfolio
router.delete("/:id", authProfile, async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ✅ Simulated Market Prices (Replace with real API later)
const getMarketPrices = async () => {
    return {
      "Bonds": 105.2,
      "Blue-Chip Stocks": 150.5,
      "Gold": 1800,
      "Index Funds": 220,
      "Corporate Bonds": 98.4,
      "Crypto": 42000,
      "Tech Stocks": 135.8,
      "Real Estate": 500000,
    };
  };
  
  // ✅ Fetch Portfolio Performance Data
  router.get("/:id/performance", authProfile, async (req, res) => {
    try {
      const portfolio = await Portfolio.findById(req.params.id);
      if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
  
      const marketPrices = await getMarketPrices();
  
      let totalValue = 0;
      const updatedAssets = portfolio.assets.map(asset => {
        const currentPrice = marketPrices[asset.assetName] || 100;
        const updatedValue = (asset.allocation / 100) * currentPrice;
        totalValue += updatedValue;
        return { ...asset, currentValue: updatedValue };
      });
  
      // ✅ Update Portfolio Performance History
      portfolio.performanceHistory.push({ value: totalValue });
      portfolio.totalValue = totalValue;
      portfolio.assets = updatedAssets;
  
      await portfolio.save();
      res.json({ totalValue, assets: updatedAssets, history: portfolio.performanceHistory });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

module.exports = router;
