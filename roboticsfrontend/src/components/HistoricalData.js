import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import "../components/styles/historicalData.css";

const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your API Key

const HistoricalData = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Stock Price",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=${API_KEY}`
        );
        const timeSeries = response.data["Time Series (Daily)"];

        const dates = Object.keys(timeSeries).slice(0, 10).reverse(); // Get last 10 days
        const prices = dates.map((date) => parseFloat(timeSeries[date]["4. close"]));

        setChartData({
          ...chartData,
          options: { ...chartData.options, xaxis: { categories: dates } },
          series: [{ name: "Stock Price", data: prices }],
        });
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();
  }, []);

  return (
    <div className="historical-data">
      <h5>Stock Performance (Last 10 Days)</h5>
      <Chart options={chartData.options} series={chartData.series} type="line" height={300} />
    </div>
  );
};

export default HistoricalData;
