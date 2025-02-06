import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import "../components/styles/historicalData.css";

const API_KEY = "WdYApLDewbU6fJ04ccQl095jRTGCKEWU"; 

const HistoricalData = () => {
  const [symbol, setSymbol] = useState("TSLA");
  const [chartData, setChartData] = useState({
    options: {
      chart: { type: "line" },
      xaxis: { categories: [] },
      stroke: { curve: "smooth" },
    },
    series: [{ name: "Stock Price", data: [] }],
  });

  const fetchHistoricalData = async (stockSymbol) => {
    try {
      const endDate = new Date().toISOString().split("T")[0]; // Today
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 10); // Last 10 days
      const formattedStartDate = startDate.toISOString().split("T")[0];

      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/${formattedStartDate}/${endDate}?apiKey=${API_KEY}`
      );

      if (response.data.results) {
        const dates = response.data.results.map((entry) =>
          new Date(entry.t).toLocaleDateString()
        );
        const prices = response.data.results.map((entry) => entry.c); // Closing prices

        setChartData({
          options: { ...chartData.options, xaxis: { categories: dates } },
          series: [{ name: "Stock Price", data: prices }],
        });
      } else {
        console.error("No data available for this stock symbol.");
      }
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricalData(symbol);
  }, [symbol]);

  return (
    <div className="historical-data">
      <h5>Stock Performance (Last 10 Days)</h5>

      {/* Dropdown to Select Stock Symbol */}
      <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
        <option value="TSLA">Tesla (TSLA)</option>
        <option value="AAPL">Apple (AAPL)</option>
        <option value="GOOGL">Google (GOOGL)</option>
        <option value="AMZN">Amazon (AMZN)</option>
        <option value="MSFT">Microsoft (MSFT)</option>
      </select>

      {/* Chart Display */}
      <Chart options={chartData.options} series={chartData.series} type="line" height={300} />
    </div>
  );
};

export default HistoricalData;
