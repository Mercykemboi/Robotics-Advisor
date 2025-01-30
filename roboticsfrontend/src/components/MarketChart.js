import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


const MarketChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Portfolio Value",
        data: data.map((entry) => entry.value),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default MarketChart;
