const express = require("express");
const yahooFinance = require("yahoo-finance2").default;

const router = express.Router();

// Fetch real-time stock data
router.get("/realtime/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const stockData = await yahooFinance.quote(symbol);
    res.json(stockData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching real-time data", error });
  }
});

// Fetch historical stock data
router.get("/history/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const history = await yahooFinance.historical(symbol, {
      period1: "2024-01-01",
      interval: "1d",
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching historical data", error });
  }
});

module.exports = router;
