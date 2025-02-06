import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/styles/marketdata.css";

const API_KEY = "WdYApLDewbU6fJ04ccQl095jRTGCKEWU"; 

const MarketData = () => {
  const [symbol, setSymbol] = useState("TSLA"); // Default stock symbol
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState(null);

  const fetchMarketData = async (stockSymbol) => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/prev?apiKey=${API_KEY}`
      );

      if (response.data.results && response.data.results.length > 0) {
        setMarketData(response.data.results[0]);
        setError(null);
      } else {
        setError("No market data available.");
      }
    } catch (error) {
      console.error("Error fetching market data:", error);
      setError("Failed to fetch market data.");
    }
  };

  useEffect(() => {
    fetchMarketData(symbol);
    const interval = setInterval(() => fetchMarketData(symbol), 60000); // Refresh every 60s
    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="market-widget">
      <h5>Market Trends (Real-Time)</h5>

      {/* Dropdown to Select Stock Symbol */}
      <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
        <option value="TSLA">Tesla (TSLA)</option>
        <option value="AAPL">Apple (AAPL)</option>
        <option value="GOOGL">Google (GOOGL)</option>
        <option value="AMZN">Amazon (AMZN)</option>
        <option value="MSFT">Microsoft (MSFT)</option>
      </select>

      {/* Display Market Data */}
      {error ? (
        <p className="error">{error}</p>
      ) : marketData ? (
        <div>
          <p>Stock: {symbol}</p>
          <p className="amount">${marketData.c}</p>
          <p>Open: ${marketData.o}</p>
          <p>High: ${marketData.h}</p>
          <p>Low: ${marketData.l}</p>
          <p>Volume: {marketData.v}</p>
        </div>
      ) : (
        <p>Loading market data...</p>
      )}
    </div>
  );
};

export default MarketData;
