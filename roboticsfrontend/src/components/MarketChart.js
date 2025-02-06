import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/styles/marketdata.css";

const API_KEY = "WdYApLDewbU6fJ04ccQl095jRTGCKEWU";  
const STOCK_SYMBOL = "TSLA";  

const MarketData = () => {
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/ticker/${STOCK_SYMBOL}/prev?apiKey=${API_KEY}`
        );

        if (response.data.results && response.data.results.length > 0) {
          const latestData = response.data.results[0];
          setMarketData(latestData);
        } else {
          setError("No market data available.");
        }
      } catch (error) {
        console.error("Error fetching market data:", error);
        setError("Failed to fetch market data.");
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Fetch data every 60s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="market-widget">
      <h5>Market Trends (Real-Time)</h5>
      {error ? (
        <p>{error}</p>
      ) : marketData ? (
        <div>
          <p>Stock: {STOCK_SYMBOL}</p>
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
