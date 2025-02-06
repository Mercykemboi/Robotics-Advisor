import React, { useState, useEffect } from "react";
import axios from "axios";

const MarketData = ({ symbol }) => {
  const [realTimeData, setRealTimeData] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Fetch real-time stock data
    axios.get(`http://localhost:5000/api/market/realtime/${symbol}`)
      .then((response) => setRealTimeData(response.data))
      .catch((error) => console.error("Error fetching real-time data:", error));

    // Fetch historical stock data
    axios.get(`http://localhost:5000/api/market/history/${symbol}`)
      .then((response) => setHistoryData(response.data))
      .catch((error) => console.error("Error fetching historical data:", error));
  }, [symbol]);

  return (
    <div className="market-data-container">
      <h2>📊 Market Data for {symbol}</h2>

      {realTimeData ? (
        <div>
          <p><strong>Price:</strong> ${realTimeData.regularMarketPrice}</p>
          <p><strong>Change:</strong> {realTimeData.regularMarketChangePercent}%</p>
        </div>
      ) : <p>Loading real-time data...</p>}

      <h3>📉 Historical Data</h3>
      {historyData.length > 0 ? (
        <ul>
          {historyData.slice(0, 5).map((data, index) => (
            <li key={index}>{data.date}: ${data.close}</li>
          ))}
        </ul>
      ) : <p>Loading historical data...</p>}
    </div>
  );
};

export default MarketData;
