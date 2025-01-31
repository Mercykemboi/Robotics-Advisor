import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/styles/marketdata.css";

const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your API Key

const MarketData = () => {
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=${API_KEY}`
        );
        setMarketData(response.data["Global Quote"]);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Fetch data every 60s
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="market-widget">
      <h5>Market Trends (Real-Time)</h5>
      {marketData ? (
        <div>
          <p>Stock: TSLA</p>
          <p className="amount">${marketData["05. price"]}</p>
          <p
            className={`change ${
              parseFloat(marketData["09. change"]) >= 0 ? "positive" : "negative"
            }`}
          >
            {marketData["09. change"]} ({marketData["10. change percent"]})
          </p>
        </div>
      ) : (
        <p>Loading market data...</p>
      )}
    </div>
  );
};

export default MarketData;
